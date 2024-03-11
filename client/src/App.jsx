import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home"
import Todo from "./components/Todo"


function App() {
  return (
    <>
           <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todo />} />
       </Routes>

    </>
  );
}

export default App;
