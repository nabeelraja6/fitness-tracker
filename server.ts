import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("fitlife.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    height REAL,
    weight REAL,
    bmi REAL,
    category TEXT,
    country TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    type TEXT, -- 'diet' or 'workout'
    content TEXT, -- JSON string
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/user", (req, res) => {
    const { id, height, weight, bmi, category, country } = req.body;
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO users (id, height, weight, bmi, category, country)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, height, weight, bmi, category, country);
    res.json({ success: true });
  });

  app.get("/api/user/:id", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    res.json(user || null);
  });

  app.post("/api/plans", (req, res) => {
    const { user_id, type, content } = req.body;
    const stmt = db.prepare(`
      INSERT INTO plans (user_id, type, content)
      VALUES (?, ?, ?)
    `);
    stmt.run(user_id, type, JSON.stringify(content));
    res.json({ success: true });
  });

  app.get("/api/plans/:user_id", (req, res) => {
    const plans = db.prepare("SELECT * FROM plans WHERE user_id = ? ORDER BY created_at DESC").all(req.params.user_id);
    res.json(plans.map(p => ({ ...p, content: JSON.parse(p.content as string) })));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
