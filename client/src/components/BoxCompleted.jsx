import ShowCompletedTodos from "./ShowCompletedTodos";

const BoxCompleted = () => {
  return (
    <div className="flex items-center justify-between p-2 flex-col w-4/12 border-4 border-black gap-2 h-full">
      <h1 className="font-bold">Done</h1>
      <ShowCompletedTodos />
    </div>
  );
};

export default BoxCompleted;
