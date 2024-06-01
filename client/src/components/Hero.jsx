import TodoBox from "./TodoBox";
import InProgressBox from "./InProgressBox";
import DoneBox from "./DoneBox";

const Hero = () => {
  return (
    <div className="Container flex flex-row p-16 h-lvh items-center">
      <TodoBox />
      <InProgressBox />
      <DoneBox />
    </div>
  );
};

export default Hero;
