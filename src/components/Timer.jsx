import { motion } from "framer-motion";

const Timer = ({ seconds, minutes }) => {
  return (
    <motion.div
      className='dark:text-slate-200'
      initial={{ color: "white" }}
      animate={{
        color: seconds > 0 ? "red" : "white",
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}>
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </motion.div>
  );
};

export default Timer;
