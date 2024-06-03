import React, { useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import TodoContext from "../utils/TodoContext";

const ShowCreatedTodos = () => {
  const { todos } = useContext(TodoContext);

  //   handle delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then((response) => {
        setTodos(response);
      })
      .catch((error) => {
        console.error("There was an error deleting the todo:", error);
      });
  };
  // update todo
  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3000/${id}`)
      .then((response) => {
        setTodos(response);
      })
      .catch((error) => {
        console.log("There was error an error updating the todo:", error);
      });
  };

  return (
    <div className="container h-full p-2 overflow-auto">
      {todos.length > 0 ? (
        todos
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
                    sendToInProgress();
                    setTodos(todos);
                  }}
                  icon={faArrowRight}
                  style={{ color: "#FFD43B" }}
                />
              </div>
            </div>
          ))
      ) : (
        <p className="border-2 h-full flex items-center justify-center font-semibold text-xl">
          No bugs for today?
        </p>
      )}
    </div>
  );
};

export default ShowCreatedTodos;
