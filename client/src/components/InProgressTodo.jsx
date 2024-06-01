const InProgressTodo = (props) => {

    console.log(props);
  return (
    <div className="container h-full p-2 overflow-auto">
      <div className="border-2 flex">
        <div className="flex flex-col p-2 w-9/12">
          {/* <h2 className="font-bold text-xl">{title}</h2>
          <p className="font-extralight text-sm truncate overline decoration-sky-500">
            {description}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default InProgressTodo;
