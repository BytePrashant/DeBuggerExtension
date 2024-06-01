import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import InProgressTodo from "./InProgressTodo";

const ShowTodo = () => {
  const [todos, setTodos] = useState([]);

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

  // get all todos
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [todos]);

  // send todo to in progress component
  const sendToInProgress = (todo) => {
    try {
      // Send the todo data to your Inprogress component using props or context
      <InProgressTodo data={todo}/>
    } catch (error) {
      console.error("Error sending todo to Inprogress:", error);
    }
  }
  return (
    <div className="container h-full p-2 overflow-auto">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo._id} className="border-2 flex">
            <div className="flex flex-col p-2 w-9/12">
              <h2 className="font-bold text-xl">{todo.title}</h2>
              <p className="font-extralight text-sm truncate overline decoration-sky-500">
                {todo.description}
              </p>
            </div>
            <div className="flex items-center justify-between p-2 w-3/12">
              <FontAwesomeIcon
                onClick={() => handleDelete(todo._id)}
                icon={faTrash}
                style={{ color: "#e69b19" }}
              />
              <FontAwesomeIcon
                onClick={() => handleEdit(todo._id)}
                icon={faPenToSquare}
                style={{ color: "#B197FC" }}
              />
              <FontAwesomeIcon
                onClick={()=> {
                  sendToInProgress(todo);
                  handleDelete(todo._id);
                }}
                icon={faArrowRight}
                style={{ color: "#FFD43B" }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="border-2 h-full flex items-center justify-center font-semibold text-xl">No bugs for today?</p>
      )}
    </div>
  );
};

export default ShowTodo;
