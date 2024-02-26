import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { IoCloseOutline } from "react-icons/io5";
import { possibleTileContents } from "../Screens";

const Scores = ({ setShowScores }) => {
  const savedScores = JSON.parse(localStorage.getItem("scores")) || [];

  console.log(savedScores);
  const [scores, setScores] = useState([]);
  const [level, setLevel] = useState("easy");

  useEffect(() => {
    const scoresToDisplay = savedScores.filter((item) => item.level === level);
    setScores(scoresToDisplay);
    console.log("useState:", scores);
  }, [level]);

  const IconComponent =
    possibleTileContents[
      Math.floor(Math.random() * possibleTileContents.length)
    ];

  return (
    <div className='fixed bg-black/70 inset-0 w-full h-full z-20 flex justify-center items-center overflow-hidden p-6'>
      <motion.div
        className='w-full aspect-square max-w-sm bg-white/90 dark:bg-slate-800/50 dark:backdrop-blur-md rounded-xl flex flex-col justify-center items-center shadow-xl p-4 py-5 gap-1 border-2 border-accentClrOne relative overflow-auto'
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
        <div className='absolute w-full h-full top-0 flex justify-center items-center text-gray-500/30 z-10'>
          <IconComponent fontSize={150} />
        </div>

        <h1 className='text-accentClrOne text-xl sm:text-2xl font-bold leading-tight sm:leading-relaxed tracking-wider'>
          Scores
        </h1>

        <div className='flex w-full max-w-sm r justify-around gap-2 font-bold z-10'>
          <button
            className={`py-1 px-3 ${
              level === "easy" &&
              "bg-primaryClrTwo/50 shadow-md dark:text-slate-800"
            } rounded-md flex-1 text-accentClrOne`}
            onClick={() => setLevel("easy")}>
            Easy
          </button>
          <button
            className={`py-1 px-3 ${
              level === "medium" &&
              "bg-primaryClrTwo/50 shadow-md dark:text-slate-800"
            } rounded-md flex-1 text-accentClrOne `}
            onClick={() => setLevel("medium")}>
            Medium
          </button>
          <button
            className={`py-1 px-3 ${
              level === "hard" &&
              "bg-primaryClrTwo/50 shadow-md dark:text-slate-800"
            } rounded-md flex-1 text-accentClrOne`}
            onClick={() => setLevel("hard")}>
            Hard
          </button>
        </div>

        {scores && Array.isArray(scores) && scores.length > 0 ? (
          <table className='w-full table-auto relative z-10'>
            <thead className='text-center text-slate-400'>
              <tr>
                <th>Date</th>
                <th>Tries</th>
                <th>Finished in</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody className='text-center text-xs sm:text-sm text-accentClrOne'>
              {scores.map((item) => (
                <tr>
                  <td>{format(item?.date, "P")}</td>
                  <td>{item?.tryCount}</td>
                  <td>{item?.timeFinished}</td>
                  <td>{item?.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='text-slate-400 py-3'>No scores to display</div>
        )}

        <button
          onClick={() => setShowScores(false)}
          className='absolute top-4 right-4 text-indigo-700 dark:text-indigo-500 z-20'>
          <IoCloseOutline fontSize={30} />
        </button>
      </motion.div>
    </div>
  );
};

export default Scores;
