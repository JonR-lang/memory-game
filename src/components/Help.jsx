import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

const Help = ({ setShowHelp }) => {
  return (
    <div className='fixed bg-black/70 inset-0 w-full h-full z-20 flex justify-center items-center overflow-hidden p-6'>
      <motion.div
        className='w-full sm:aspect-square max-w-md bg-white/90 dark:bg-slate-800/50 dark:backdrop-blur-md rounded-xl flex flex-col justify-center items-center shadow-xl p-4 py-5 gap-3 border-2 border-accentClrOne text-center relative'
        initial={{
          y: 700,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          type: "spring",
          duration: 0.5,
          delay: 0.5,
        }}>
        <h1>How to play</h1>
        <ul>
          <li>Flip over two tiles to reveal their hidden symbols.</li>
          <li>
            If the symbols match, they will remain face-up. If not, they will
            flip back over after a brief moment.
          </li>
          <li>
            Your goal is to match all the tiles in the fewest tries possible.
          </li>
          <li>The timer will start as soon as you flip over the first tile.</li>
          <li>Try to match all the tiles as quickly as you can!</li>
        </ul>
        <button
          onClick={() => setShowHelp(false)}
          className='absolute top-4 right-4'>
          <IoCloseOutline fontSize={30} />
        </button>
      </motion.div>
    </div>
  );
};

export default Help;
