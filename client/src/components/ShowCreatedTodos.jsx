import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import TodoContext from "../utils/TodoContext";
import axios from 'axios'

const ShowCreatedTodos = () => {
  const { todos, setTodos } = useContext(TodoContext);

  // handle Delete function
  const handleDelete = async(id) => {
    axios
    .delete(`http://localhost:3000/todos/${id}`)
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  }

  // handle Status change function
  const sendToInProgress = async (todo) => {
    try {
      const updatedTodo = { ...todo, status: "pending" }; // Create a copy with updated status
      const response = await axios.put(`http://localhost:3000/todos/${todo._id}`, updatedTodo); // Send a PUT request
  
      if (response.ok) {
        // Update the local state with the updated todo (optional)
        setTodos(prevTodos => prevTodos.map(prevTodo => prevTodo._id === todo._id ? updatedTodo : prevTodo));
      } else {
        throw new Error("Error updating todo status");
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  return (
    <div className="container h-full p-2 overflow-auto">
     
        {todos
          .filter((todo) => todo.status === "created")
          .map((todo) => (
            <div key={todo._id} className="border-2 flex w-full">
              <div className="flex flex-col p-2 w-4/5">
                <h2 className="font-bold text-xl">{todo.title}</h2>
                <p className="font-extralight text-sm truncate overline decoration-sky-500">
                  {todo.description}
                </p>
              </div>
              <div className="flex items-center justify-center w-1/5">
                <FontAwesomeIcon
                  className="p-1 w-full"
                  onClick={() => handleDelete(todo._id)}
                  icon={faTrash}
                  style={{ color: "#e69b19" }}
                />
                <FontAwesomeIcon
                  className="p-1 w-full"
                  onClick={() => {
                    sendToInProgress(todo);
                  }}
                  icon={faArrowRight}
                  style={{ color: "#FFD43B" }}
                />
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default ShowCreatedTodos;
