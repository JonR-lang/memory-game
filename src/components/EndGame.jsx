import { motion } from "framer-motion";
import { possibleTileContents } from "../Screens";

const EndGame = ({
  start,
  end,
  tryCount,
  setShowEndGame,
  setTiles,
  setTryCount,
}) => {
  const score = Math.round((1 / parseInt(tryCount)) * 1000);
  const IconComponent =
    possibleTileContents[
      Math.floor(Math.random() * possibleTileContents.length)
    ];
  return (
    <div>
      <motion.div>
        <div></div>
        <div></div>
        <div></div>
      </motion.div>
    </div>
  );
};

export default EndGame;
