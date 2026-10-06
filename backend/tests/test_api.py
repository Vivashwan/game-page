from datetime import date, timedelta

import pytest
from fastapi.testclient import TestClient

from app import db


@pytest.fixture()
def client(tmp_path, monkeypatch):
    path = tmp_path / "test.sqlite3"
    monkeypatch.setattr(db, "DB_PATH", path)
    db.init_db(path)
    from app.main import app

    with TestClient(app) as c:
        yield c


def iso(days_from_today):
    return (date.today() + timedelta(days=days_from_today)).isoformat()


def test_categories_have_counts(client):
    cats = client.get("/api/categories").json()
    counts = {c["slug"]: c["product_count"] for c in cats}
    assert counts["ps5-console"] == 23
    assert sum(counts.values()) == 29


def test_products_paginate_in_listing_order(client):
    first = client.get("/api/products", params={"limit": 12}).json()
    assert first["total"] == 29
    assert len(first["items"]) == 12
    assert first["items"][0]["name"] == "PS5 + Games (100+) + 1 Controller"
    assert first["items"][2]["name"] == "Oculus Quest 3S"
    rest = client.get("/api/products", params={"offset": 24, "limit": 12}).json()
    assert len(rest["items"]) == 5


def test_category_filter(client):
    vr = client.get("/api/products", params={"category": "vr"}).json()
    assert vr["total"] == 3
    assert {p["category"] for p in vr["items"]} == {"vr"}
    assert client.get("/api/products", params={"category": "nope"}).status_code == 404


def test_prices_use_rental_days(client):
    page = client.get("/api/products", params={"start": iso(1), "end": iso(4)}).json()
    first = page["items"][0]
    assert first["rental_days"] == 3
    assert first["total_price"] == first["per_day_rent"] * 3
    quest = next(p for p in page["items"] if p["name"] == "Oculus Quest 3S")
    assert quest["per_day_rent"] is None and quest["total_price"] is None


@pytest.mark.parametrize(
    "params",
    [{"start": iso(1)}, {"start": iso(-1), "end": iso(2)}, {"start": iso(3), "end": iso(3)}],
)
def test_invalid_dates_rejected(client, params):
    assert client.get("/api/products", params=params).status_code == 422


def test_quote(client):
    assert client.get("/api/quote", params={"start": iso(0), "end": iso(5)}).json()["rental_days"] == 5


def test_vote_only_for_vote_to_launch(client):
    portal = next(
        p for p in client.get("/api/products", params={"limit": 50}).json()["items"] if p["tag"] == "Vote to Launch"
    )
    res = client.post(f"/api/products/{portal['id']}/vote").json()
    assert res["votes"] == portal["booked_count"] + 1
    assert client.post("/api/products/18273/vote").status_code == 409
    assert client.post("/api/products/1/vote").status_code == 404


def test_faqs_and_reviews(client):
    assert len(client.get("/api/faqs").json()) == 7
    reviews = client.get("/api/reviews").json()
    assert len(reviews) == 6 and all(1 <= r["stars"] <= 5 for r in reviews)
