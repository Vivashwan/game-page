import os
import sqlite3
from contextlib import contextmanager
from pathlib import Path

DB_DIR = Path(__file__).resolve().parent.parent / "db"
DB_PATH = Path(os.environ.get("DATABASE_PATH", DB_DIR / "rentals.sqlite3"))


def init_db(path: Path = DB_PATH, force: bool = False) -> None:
    """Create the database from schema.sql + seed.sql if it doesn't exist yet."""
    if path.exists() and not force:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path)
    try:
        conn.executescript((DB_DIR / "schema.sql").read_text())
        conn.executescript((DB_DIR / "seed.sql").read_text())
        conn.commit()
    finally:
        conn.close()


@contextmanager
def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()
