import Database from "better-sqlite3";

const db = new Database("closet.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS clothing_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    color TEXT,
    brand TEXT,
    size TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS wishlist_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,
    link TEXT NOT NULL,
    brand TEXT,
    price_cents INTEGER,
    category TEXT,
    note TEXT,

    status TEXT NOT NULL DEFAULT 'want'
      CHECK (status IN ('need', 'want', 'maybe')),

    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;