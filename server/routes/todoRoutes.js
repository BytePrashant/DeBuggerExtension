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
    console.log(error.message);
  }
});

// get a single todo
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    return res.status(201).json(todo);
  } catch (error) {
    console.log(error.message);
  }
});

// create a todo
router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(500).send({ message: "Title is not there" });
    }
  } catch (error) {
    console.log(error.message);
  }

  const newTodo = {
    title: req.body.title,
    description: req.body.description,
  };

  const todo = await Todo.create(newTodo);

  return res.status(201).send(todo);
});

// update a todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "Todo not found" });
    }
    return res.status(200).send("Todo updated successfully");
  } catch (error) {
    console.log(error.message);
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