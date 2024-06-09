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
      .get("https://debuggerextension.onrender.com/todos")
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // handle Status change function
  const sendToPending = async (todo) => {
    try {
      const updatedTodo = { ...todo, status: "pending" };
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo._id === todo._id ? updatedTodo : prevTodo
        )
      );

      const response = await axios.put(
        `https://debuggerextension.onrender.com/todos/${todo._id}`,
        updatedTodo
      );

      if (!response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((prevTodo) =>
            prevTodo._id === todo._id ? todo : prevTodo
          )
        );
        throw new Error("Error updating todo status");
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  // handle Status change function
  const sendToCompleted = async (todo) => {
    try {
      const updatedTodo = { ...todo, status: "completed" };
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo._id === todo._id ? updatedTodo : prevTodo
        )
      );
      const response = await axios.put(
        `https://debuggerextension.onrender.com/todos/${todo._id}`,
        updatedTodo
      );
      if (!response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((prevTodo) =>
            prevTodo._id === todo._id ? todo : prevTodo
          )
        );
      } else {
        throw new Error("Error updating todo status");
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  // handle Delete function
  const handleDelete = async (id) => {
    axios.delete(`https://debuggerextension.onrender.com/todos/${id}`);
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
