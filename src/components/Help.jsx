import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { possibleTileContents } from "../Screens";

const Help = ({ setShowHelp }) => {
  const IconComponent =
    possibleTileContents[
      Math.floor(Math.random() * possibleTileContents.length)
    ];

  return (
    <div className="fixed bg-black/70 inset-0 w-full h-full z-20 flex justify-center items-center overflow-hidden p-6">
      <motion.div
        className="w-full sm:aspect-square max-w-sm bg-white/90 dark:bg-slate-800/50 dark:backdrop-blur-md rounded-xl flex flex-col justify-center items-center shadow-xl p-4 py-5 gap-3 border-2 border-accentClrOne relative"
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
        }}
      >
        <div className="absolute w-full h-full top-0 flex justify-center items-center text-gray-500/30 z-10">
          <IconComponent fontSize={150} />
        </div>

        <h1 className="text-accentClrOne text-xl sm:text-2xl font-bold leading-tight sm:leading-relaxed tracking-wider">
          How to Play
        </h1>
        <ul className="flex flex-col gap-2 text-accentClrOne leading-6 text-sm sm:text-base relative z-20">
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
          className="absolute top-4 right-4 text-indigo-700 dark:text-indigo-500 z-20"
        >
          <IoCloseOutline fontSize={30} />
        </button>
      </motion.div>
    </div>
  );
};

export default Help;
