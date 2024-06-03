import ShowPendingTodos from "./ShowPendingTodo";

const BoxPending = () => {
  return (
    <>
      <div className="flex items-center justify-between p-2 flex-col w-4/12 border-4 border-black gap-2 h-full">
        <h1 className="font-bold">In Progress Issues</h1>
        <ShowPendingTodos />
      </div>
    </>
  );
};

export default BoxPending;
