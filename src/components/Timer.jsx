import useTimer from "../hooks/useTimer";

const Timer = ({ seconds, minutes }) => {
  console.log("from Timer comp:", seconds, minutes);
  return (
    <div>
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
