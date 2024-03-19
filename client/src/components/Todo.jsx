import { useState } from "react";

function Todo() {
  const [description, setDescription] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const todoData = { description };
      console.log("************************")
      const res =  await fetch("http://localhost:3000/todos/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(todoData),
      }).then((response) => response.json())
      .then((data) => {
        console.log(data.user_id);
      })
      .catch((error) => console.error("Error:", error));
      console.log(res);
      setDescription("");
    } catch (err) {
      console.error(err.mesage);
    }
  };
  return (
    <>
      <form className="max-w-sm mx-auto m-60" onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          What your priority for today!
        </label>
        <div className="mb-5 flex">
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
            placeholder="Enter your priority"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default Todo;
