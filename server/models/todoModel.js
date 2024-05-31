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
  }
});

// Mongoose model
export const Todo = mongoose.model("todo", todoSchema);
