import os
from contextlib import asynccontextmanager
from datetime import date

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .db import get_conn, init_db


@asynccontextmanager
async def lifespan(_app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Gaming Rentals API", version="1.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(","),
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ---------- response models ----------
class Category(BaseModel):
    slug: str
    name: str
    icon: str
    product_count: int


class Product(BaseModel):
    id: int
    name: str
    category: str
    tag: str
    per_day_rent: float | None
    rating: float
    booked_count: int
    out_of_stock: bool
    icon: str
    rental_days: int | None = None
    total_price: float | None = None


class ProductPage(BaseModel):
    total: int
    offset: int
    limit: int
    items: list[Product]


class Faq(BaseModel):
    id: int
    question: str
    answer: str


class Review(BaseModel):
    id: int
    name: str
    city: str
    item: str
    stars: int
    body: str


class Quote(BaseModel):
    start: date
    end: date
    rental_days: int


class VoteResult(BaseModel):
    id: int
    votes: int


# ---------- helpers ----------
def rental_days(start: date | None, end: date | None) -> int | None:
    """Days charged between delivery and pickup. Both dates or neither."""
    if start is None and end is None:
        return None
    if start is None or end is None:
        raise HTTPException(422, "Provide both start and end dates")
    if start < date.today():
        raise HTTPException(422, "Start date cannot be in the past")
    if end <= start:
        raise HTTPException(422, "End date must be after start date")
    return (end - start).days


PRODUCT_SELECT = """
    SELECT p.id, p.name, c.slug AS category, p.tag, p.per_day_rent, p.rating,
           p.booked_count, p.out_of_stock, p.icon
    FROM products p
    JOIN categories c ON c.id = p.category_id
"""


def to_product(row, days: int | None) -> Product:
    product = Product(**dict(row))
    if days is not None:
        product.rental_days = days
        if product.per_day_rent is not None:
            product.total_price = round(product.per_day_rent * days, 2)
    return product


# ---------- routes ----------
@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/categories", response_model=list[Category])
def list_categories():
    with get_conn() as conn:
        rows = conn.execute(
            """
            SELECT c.slug, c.name, c.icon, COUNT(p.id) AS product_count
            FROM categories c
            LEFT JOIN products p ON p.category_id = c.id
            GROUP BY c.id
            ORDER BY c.sort_order
            """
        ).fetchall()
    return [Category(**dict(r)) for r in rows]


@app.get("/api/products", response_model=ProductPage)
def list_products(
    category: str | None = Query(None, description="Category slug; omit for all"),
    offset: int = Query(0, ge=0),
    limit: int = Query(12, ge=1, le=50),
    start: date | None = Query(None, description="Delivery date (YYYY-MM-DD)"),
    end: date | None = Query(None, description="Pickup date (YYYY-MM-DD)"),
):
    days = rental_days(start, end)
    where, params = "", []
    if category:
        where, params = "WHERE c.slug = ?", [category]
    with get_conn() as conn:
        if category and not conn.execute("SELECT 1 FROM categories WHERE slug = ?", [category]).fetchone():
            raise HTTPException(404, f"Unknown category '{category}'")
        total = conn.execute(
            f"SELECT COUNT(*) FROM products p JOIN categories c ON c.id = p.category_id {where}", params
        ).fetchone()[0]
        rows = conn.execute(
            f"{PRODUCT_SELECT} {where} ORDER BY p.sort_order LIMIT ? OFFSET ?", [*params, limit, offset]
        ).fetchall()
    return ProductPage(total=total, offset=offset, limit=limit, items=[to_product(r, days) for r in rows])


@app.get("/api/products/{product_id}", response_model=Product)
def get_product(product_id: int, start: date | None = None, end: date | None = None):
    days = rental_days(start, end)
    with get_conn() as conn:
        row = conn.execute(f"{PRODUCT_SELECT} WHERE p.id = ?", [product_id]).fetchone()
    if row is None:
        raise HTTPException(404, "Product not found")
    return to_product(row, days)


@app.post("/api/products/{product_id}/vote", response_model=VoteResult)
def vote_for_product(product_id: int):
    with get_conn() as conn:
        row = conn.execute("SELECT tag FROM products WHERE id = ?", [product_id]).fetchone()
        if row is None:
            raise HTTPException(404, "Product not found")
        if row["tag"] != "Vote to Launch":
            raise HTTPException(409, "This product is not open for votes")
        votes = conn.execute(
            "UPDATE products SET booked_count = booked_count + 1 WHERE id = ? RETURNING booked_count",
            [product_id],
        ).fetchone()[0]
    return VoteResult(id=product_id, votes=votes)


@app.get("/api/quote", response_model=Quote)
def quote(start: date, end: date):
    return Quote(start=start, end=end, rental_days=rental_days(start, end))


@app.get("/api/faqs", response_model=list[Faq])
def list_faqs():
    with get_conn() as conn:
        rows = conn.execute("SELECT id, question, answer FROM faqs ORDER BY sort_order").fetchall()
    return [Faq(**dict(r)) for r in rows]


@app.get("/api/reviews", response_model=list[Review])
def list_reviews():
    with get_conn() as conn:
        rows = conn.execute("SELECT id, name, city, item, stars, body FROM reviews ORDER BY id").fetchall()
    return [Review(**dict(r)) for r in rows]
