import { useContext, useState } from "react";
import TodoContext from "../utils/TodoContext";
import axios from "axios";

const CreateTodo = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // handle create a todo function
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title) {
      return alert("Title is required");
    }

    const newTodo = {
      title,
      description,
      status: "created",
    };

    try {
      const response = await axios.post("https://debuggerextension.onrender.com/todos", newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.log("Error creating a todo", error);
    }
    setTitle(""); // Clear input fields after successful creation
    setDescription("");
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        name="title"
        rows="1"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Title..."
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="description"
        rows="3"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Describe your issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={handleCreate}
      >
        Create +
      </button>
    </div>
  );
};

export default CreateTodo;
