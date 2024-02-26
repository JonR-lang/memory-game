import { motion } from "framer-motion";

const Timer = ({ seconds, minutes }) => {
  return (
    <div className='text-slate-500'>
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
