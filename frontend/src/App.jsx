import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(desc);
    setTitle("");
    setDesc("");
  };
  function parsedData(data) {
    console.log(data);
  }
  function callback(res) {
    res.json().then(parsedData);
  }
  function sendTodo() {
    fetch("http://localhost:3000/", {
      method: "POST",
      body: JSON.stringify({
        title: "Work hard",
        description: "Exercise from 8am to 9am",
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(callback);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <h1 className="bg-black text-white text-5xl text-center p-10">
          Todo App
        </h1>
        <div className="p-6 rounded-md shadow-md bg-slate-500">
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your todo here..."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              placeholder="Write your description here..."
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4"
              onClick={sendTodo}
            >
              Create Todo
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Delete Todo
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
