# Gaming Gadgets on Rent

A rental marketplace listing page ("Gaming gadgets on rent", Bangalore), built as a full-stack exercise.

| Layer    | Stack                                              |
|----------|----------------------------------------------------|
| Frontend | Next.js 16 (App Router), React 19, JavaScript      |
| Backend  | Python 3.12, FastAPI, REST API                     |
| Database | SQLite, created from plain SQL (`schema.sql`, `seed.sql`) |

## Running locally

You need Node 20+ and Python 3.12+. Run the backend and the frontend in two terminals.

**1. Backend (port 8010)**

```bash
cd backend
python3 -m venv .venv
./.venv/bin/pip install -r requirements-dev.txt
./.venv/bin/uvicorn app.main:app --reload --port 8010
```

The database file (`backend/db/rentals.sqlite3`) is created and seeded on first start. Delete it to reset the data.
Interactive API docs: http://127.0.0.1:8010/docs

**2. Frontend (port 3000)**

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. If the API runs somewhere else, set `API_URL` (see `frontend/.env.example`).

**Tests**

```bash
cd backend && ./.venv/bin/python -m pytest
cd frontend && npm run lint
```

## REST API

| Method | Path                          | Description |
|--------|-------------------------------|-------------|
| GET    | `/api/health`                 | Health check |
| GET    | `/api/categories`             | Sub-categories with product counts |
| GET    | `/api/products`               | Paginated products. Query: `category`, `offset`, `limit` (max 50), `start`, `end` (YYYY-MM-DD). With dates, each item includes `rental_days` and `total_price`. |
| GET    | `/api/products/{id}`          | One product (optional `start`/`end` for pricing) |
| POST   | `/api/products/{id}/vote`     | Vote for a "Vote to Launch" product (409 for others) |
| GET    | `/api/quote?start=&end=`      | Validates a rental range and returns the number of days |
| GET    | `/api/faqs`                   | FAQs |
| GET    | `/api/reviews`                | Customer reviews |

Date rules (enforced by the API): both dates required together, start not in the past, end after start.

## How it fits together

- `frontend/app/page.js` is a server component. It fetches categories, the first page of products, FAQs and reviews from the API on every request.
- Interactive parts are client components: the sidebar filter and "Show More" (`Catalog.jsx`), the date picker (`DateModal.jsx`), voting (`ProductCard.jsx`) and the FAQ toggle.
- In the browser, calls go to `/api/*` on the Next.js server, which proxies them to FastAPI (`next.config.mjs` rewrites), so no CORS setup is needed.
- Selected rental dates live in a React context (`AppProvider.jsx`). Changing them refetches products with prices calculated by the backend.

```
backend/
  app/main.py        FastAPI routes and response models
  app/db.py          SQLite connection and database init
  db/schema.sql      Tables, constraints, index
  db/seed.sql        Products, categories, FAQs, reviews
  tests/test_api.py  API tests (pytest)
frontend/
  app/               layout, page, error screen, global CSS
  components/        Header, Hero, Catalog, ProductCard, Promos, Faq, Reviews, Footer, FloatingBar, DateModal, Icons
  lib/api.js         fetch helper for server and client
```

Brand name, product imagery (drawn icons), reviews and long-form copy are placeholders.
