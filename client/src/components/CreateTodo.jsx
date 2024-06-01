import { useState } from "react";
import axios from "axios";

const CreateTodo = () => {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [inputText, setInputText] = useState();

  // handle add funtion

  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:3000/todos", {
        title: todo.title,
        description: todo.description,
      });
      setTodo({ title: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  };

//  handle input field value change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        name="title"
        value={todo.title}
        onChange={handleChange}
        rows="1"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Title..."
        autoFocus
      />
      <textarea
        name="description"
        value={todo.description}
        onChange={handleChange}
        rows="3"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Describe your issue..."
      />
      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={handleAdd}
      >
        Create +
      </button>
    </div>
  );
};

export default CreateTodo;
