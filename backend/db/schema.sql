-- Schema for the gaming rentals listing.
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS reviews;

CREATE TABLE categories (
    id          INTEGER PRIMARY KEY,
    slug        TEXT    NOT NULL UNIQUE,
    name        TEXT    NOT NULL,
    icon        TEXT    NOT NULL,
    sort_order  INTEGER NOT NULL
);

CREATE TABLE products (
    id            INTEGER PRIMARY KEY,
    name          TEXT    NOT NULL,
    category_id   INTEGER NOT NULL REFERENCES categories(id),
    tag           TEXT    NOT NULL DEFAULT '' CHECK (tag IN ('', 'Trending', 'New', 'Vote to Launch')),
    per_day_rent  REAL    CHECK (per_day_rent IS NULL OR per_day_rent > 0),  -- NULL = price on request
    rating        REAL    NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
    booked_count  INTEGER NOT NULL DEFAULT 0,  -- votes for 'Vote to Launch' products
    out_of_stock  INTEGER NOT NULL DEFAULT 0 CHECK (out_of_stock IN (0, 1)),
    icon          TEXT    NOT NULL,
    sort_order    INTEGER NOT NULL
);

CREATE INDEX idx_products_category ON products (category_id, sort_order);

CREATE TABLE faqs (
    id          INTEGER PRIMARY KEY,
    question    TEXT    NOT NULL,
    answer      TEXT    NOT NULL,
    sort_order  INTEGER NOT NULL
);

CREATE TABLE reviews (
    id     INTEGER PRIMARY KEY,
    name   TEXT    NOT NULL,
    city   TEXT    NOT NULL,
    item   TEXT    NOT NULL,
    stars  INTEGER NOT NULL CHECK (stars BETWEEN 1 AND 5),
    body   TEXT    NOT NULL
);
