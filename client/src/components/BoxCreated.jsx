import ShowCreatedTodos from "./ShowCreatedTodos";
import CreateTodo from "./CreateTodo";


const BoxCreated = () => {
  return (
    <div className="flex items-center justify-between p-2 flex-col w-4/12 border-4 border-black gap-2 h-full">
      <h1 className="font-bold">To Do Issue</h1>
      <ShowCreatedTodos />
      <CreateTodo />
    </div>
  );
};

export default BoxCreated;
