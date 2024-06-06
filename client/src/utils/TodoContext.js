import { createContext } from "react";

const TodoContext = createContext({
  todos: [],
  handleDelete: () => {},
  sendToPending: () => {},
  sendToCompleted: () => {}
});

export default TodoContext;
