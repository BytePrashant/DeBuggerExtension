import React, { useEffect, useState } from "react";
import BoxCreated from "./BoxCreated";
import BoxPending from "./BoxPending";
import BoxCompleted from "./BoxCompleted";
import TodoContext from "../utils/TodoContext";
import axios from "axios";

const Hero = () => {
  const [todos, setTodos] = useState([]);

  // Read all todos
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // change status to pending
  const sendToPending = async (todo) => {
    try {
      const updatedTodo = { ...todo, status: "pending" };
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo._id === todo._id ? updatedTodo : prevTodo
        )
      );
      await axios.put(`http://localhost:3000/todos/${todo._id}`, updatedTodo); // Send a PUT request
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  // change status to completed
  const sendToCompleted = async (todo) => {
    try {
      const updatedTodo = { ...todo, status: "completed" }; // Create a copy with updated status
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo._id === todo._id ? updatedTodo : prevTodo
        )
      );
      await axios.put(`http://localhost:3000/todos/${todo._id}`, updatedTodo);
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  // handle Delete function
  const handleDelete = async (id) => {
    axios.delete(`http://localhost:3000/todos/${id}`);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, sendToPending, sendToCompleted, handleDelete }}
    >
      <div className="Container flex flex-row p-16 h-lvh items-center">
        <BoxCreated />
        <BoxPending />
        <BoxCompleted />
      </div>
    </TodoContext.Provider>
  );
};

export default Hero;
