const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.send(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");
    res.send(todos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.send(todo.rows)
    } catch (err) {
        console.error(err.message);
    }
})

// update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.send("Todo Updated");
    } catch (err) {
        console.error(err.message);
    }
})

// delete a todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.send("Todo delete");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(3000, () => {
  console.log("server running on port 3000");
});
