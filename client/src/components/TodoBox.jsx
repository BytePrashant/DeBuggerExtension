import CreateTodo from "./CreateTodo";
import ShowTodo from "./ShowTodo";

const TodoBox = () => {
  return (
    <div className="flex items-center justify-between p-2 flex-col w-4/12 border-4 border-black gap-2 h-full">
      <h1 className="font-bold">To Do Issue</h1>
      <ShowTodo />
      <CreateTodo />
    </div>
  );
};

export default TodoBox;
