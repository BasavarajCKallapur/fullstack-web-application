import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "env_test",
  waitForConnections: true,
  connectionLimit: 10,
});

app.post("/add-user", async (req, res) => {
  const name = (req.body?.name ?? "").trim();
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  try {
    const [result] = await pool.execute(
      "INSERT INTO users (name) VALUES (?)",
      [name]
    );
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, created_at FROM users ORDER BY id ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.put("/update-user/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const name = (req.body?.name ?? "").trim();

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Valid user ID is required" });
  }
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  try {
    const [result] = await pool.execute(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ id, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.delete("/delete-user/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Valid user ID is required" });
  }

  try {
    const [result] = await pool.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT}`);
});
