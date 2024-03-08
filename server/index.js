const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const session = require('express-session');
const cookieParser = require('cookie-parser');


// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'myS3cr3t',
  resave: false,
  saveUninitialized: true,
}));

// Routes

// Create a User
app.post("/",async (req, res) => {
  try {
    const {username} = req.body;
    const newUser = await pool.query('INSERT INTO client(username) VALUES($1) RETURNING *', [username]);
    req.session.user_id = newUser.rows[0].user_id;
    res.send(newUser.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
})

// Delete a User
app.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    await pool.query("DELETE FROM client WHERE user_id = $1", [id])
    res.send("User deleted!!")
  } catch (err) {
    console.error(err.message)
  }
})

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const user_id = req.session.user_id;
    const newTodo = await pool.query(
      "INSERT INTO todo(description, user_id) VALUES($1, (SELECT user_id FROM client WHERE user_id = $2)) RETURNING *",
      [description, user_id]
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
