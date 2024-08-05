import express from "express";
import { select, get, insert, update, remove } from "./db/db.js";

const app = express();
const PORT = process.env.PORT ?? 3000;
const WEBSITE_URL = process.env.BASE_URL ?? "http://localhost:" + PORT;

/*------------------
---- Middleware ----
------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*------------------
------ Routes ------
------------------*/
app.get("/", (req, res) => {
  res.json({ serverMessage: "Hello World!" });
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users";
  const params: any[] = [];
  const rows = await select(sql, params);
  res.json(rows);
});

app.post("/user", async (req, res) => {
  const { username, email } = req.body;
  const sql = "INSERT INTO users (username, email) VALUES (?, ?)";
  const params = [username, email];
  const id = await insert(sql, params);
  res.json({ id });
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";
  const params = [id];
  const changes = await remove(sql, params);
  res.json({ changes });
});

app.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const { username, email } = req.body;
  const sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
  const params = [username, email, id];
  const changes = await update(sql, params);
  res.json({ changes });
});

app.get("/list/:userId", async (req, res) => {
  const id = req.params.userId;
  const sql = "SELECT * FROM lists WHERE user_id = ?";
  const params = [id];
  const rows = await select(sql, params);
  res.json(rows);
});

app.post("/list", async (req, res) => {
  const { userId, title } = req.body;
  const sql = "INSERT INTO lists (user_id, title) VALUES (?, ?)";
  const params = [userId, title];
  const id = await insert(sql, params);
  res.json({ id });
});

app.delete("/list/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM lists WHERE id = ?";
  const params = [id];
  const changes = await remove(sql, params);
  res.json({ changes });
});

app.put("/list/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const sql = "UPDATE lists SET title = ? WHERE id = ?";
  const params = [title, id];
  const changes = await update(sql, params);
  res.json({ changes });
});

app.get("/list/tasks/:listId", async (req, res) => {
  const id = req.params.listId;
  const sql = "SELECT * FROM tasks WHERE list_id = ?";
  const params = [id];
  const rows = await select(sql, params);
  res.json(rows);
});

app.get("/task/:taskId", async (req, res) => {
  const id = req.params.taskId;
  const sql = "SELECT * FROM tasks WHERE id = ?";
  const params = [id];
  const row = await get(sql, params);
  res.json(row);
});

app.post("/task", async (req, res) => {
  const { listId, title } = req.body;
  const sql = "INSERT INTO tasks (list_id, title) VALUES (?, ?)";
  const params = [listId, title];
  const id = await insert(sql, params);
  res.json({ id });
});

app.delete("/task/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM tasks WHERE id = ?";
  const params = [id];
  const changes = await remove(sql, params);
  res.json({ changes });
});

app.put("/task/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const sql = "UPDATE tasks SET title = ? WHERE id = ?";
  const params = [title, id];
  const changes = await update(sql, params);
  res.json({ changes });
});

/*------------------
------ Server ------
------------------*/
app.listen(PORT, () => console.log(`Server is running at ${WEBSITE_URL}`));
