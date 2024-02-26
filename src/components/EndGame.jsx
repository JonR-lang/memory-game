import { motion } from "framer-motion";
import { possibleTileContents } from "../Screens";

const EndGame = ({
  start,
  end,
  tryCount,
  setShowEndGame,
  setTiles,
  resetTimer,
  getTotalSeconds,
  setTryCount,
}) => {
  console.log(getTotalSeconds());
  //This is done to calculate the score factor:)
  const tryFactor = Math.round((1 / parseInt(tryCount)) * 1000);
  const timeFactor = Math.round((1 / parseInt(getTotalSeconds())) * 1000);
  const score = tryFactor + timeFactor;

  //get random icon
  const IconComponent =
    possibleTileContents[
      Math.floor(Math.random() * possibleTileContents.length)
    ];
  return (
    <div className='fixed bg-black/70 inset-0 w-full h-full z-20 flex justify-center items-center overflow-hidden p-6'>
      <motion.div
        className='w-full sm:aspect-square max-w-sm bg-white/90 dark:bg-slate-800/50 dark:backdrop-blur-md rounded-xl flex flex-col justify-center items-center shadow-xl p-4 py-5 gap-3 border-2 border-accentClrOne '
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
        <div className='text-sm flex gap-2 absolute top-2 text-accentClrOne'>
          <p>Tries :{tryCount}</p>
          <p>Timer :{getTotalSeconds()}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-slate-500'>Your Score</p>
          <p className='text-6xl font-bold text-accentClrOne'>{score}</p>
        </div>

        <div className='text-slate-400 drop-shadow-xl'>
          <IconComponent fontSize={100} />
        </div>

        <p className='text-sm text-accentClrOne underline'>
          <a
            href={`https://twitter.com/intent/tweet?text=Just%20scored%20${score}%20on%20Memory%20Meld!%20Can%20you%20beat%20it?%20Play%20now:%20https://memory-meld.onrender.com`}
            target='_blank'
            rel='noopener noreferrer'>
            Share on Twitter!
          </a>
        </p>

        <div className='flex gap-3 w-full justify-center'>
          <button
            onClick={end}
            className='rounded-lg bg-accentClrOne flex-1 max-w-32 py-2 text-slate-300 hover:scale-105 duration-200'>
            Quit
          </button>
          <button
            className='rounded-lg bg-accentClrOne flex-1 max-w-32 py-2 text-slate-300 hover:scale-105 duration-200'
            onClick={() => {
              setTiles(null);
              setTryCount(0);
              resetTimer();
              setTimeout(start, 0);
              setShowEndGame(false);
            }}>
            Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EndGame;
