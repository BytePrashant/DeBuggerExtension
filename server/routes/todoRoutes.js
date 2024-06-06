import express from "express";
import { Todo } from "../models/todoModel.js";

const router = express.Router();

// get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.status(201).json({
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.log(`yahan get request mai hu ${error.message}`);
  }
});

// get a single todo
router.get("/:id", async (req, res) => {
  try {
    const { status } = req.params;
    const todo = await Todo.findById(status);
    return res.status(201).json(todo);
  } catch (error) {
    console.log(error.message);
  }
});

// create a todo
router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({ message: "Title is required" });
    }
    const {title, description, status} = req.body
    const newTodo = {
      title,
      description,
      status
    };
    const todo = await Todo.create(newTodo);
    return res.status(201).send(todo);
  } catch (error) {
    console.log(`createTodo wale route mai error aarha h ${error.message}`);
  }
});

// update a todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(id, updatedTodo);
    if (!todo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    return res.status(200);
  } catch (error) {
    res.status(500).send({ messsage: error.message });
  }
});

// delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send("Todo not found");
    }

    return res.status(201).send("Todo deleted Successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
