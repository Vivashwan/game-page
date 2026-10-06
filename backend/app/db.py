import os
import sqlite3
from contextlib import contextmanager
from pathlib import Path

DB_DIR = Path(__file__).resolve().parent.parent / "db"
# On Vercel the deployed code is read-only; /tmp is the only writable directory.
_DEFAULT_DB = Path("/tmp/rentals.sqlite3") if os.environ.get("VERCEL") else DB_DIR / "rentals.sqlite3"
DB_PATH = Path(os.environ.get("DATABASE_PATH", _DEFAULT_DB))


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
    # Serverless platforms may skip the startup hook, so make sure the database exists here too.
    init_db(DB_PATH)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()
