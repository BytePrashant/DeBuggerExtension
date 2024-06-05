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

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <div className="Container flex flex-row p-16 h-lvh items-center">
        <BoxCreated />
        <BoxPending />
        <BoxCompleted />
      </div>
    </TodoContext.Provider>
  );
};

export default Hero;
