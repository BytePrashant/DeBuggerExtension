import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TodoContext from "../utils/TodoContext";

const ShowPendingTodos = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="container h-full p-2 overflow-auto">
      {todos.length > 0 ? (
        todos
          .filter((todo) => todo.status === "pending")
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

export default ShowPendingTodos;
