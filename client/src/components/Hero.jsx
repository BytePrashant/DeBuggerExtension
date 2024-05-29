import Todo from "./Todo";
import InProgress from "./InProgress";
import Done from "./Done";

const Hero = () => {
  return (
    <div className="flex flex-row p-16">
      <Todo />
      <InProgress />
      <Done />
    </div>
  );
};

export default Hero;
