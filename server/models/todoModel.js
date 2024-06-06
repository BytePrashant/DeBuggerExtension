import mongoose from "mongoose";

// Mongoose schema
const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  }
});

// Mongoose model
export const Todo = mongoose.model("todo", todoSchema);
