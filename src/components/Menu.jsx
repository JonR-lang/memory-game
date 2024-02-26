import { CiMenuKebab } from "react-icons/ci";
import {
  IoMusicalNotes,
  IoExitOutline,
  IoVolumeMedium,
  IoVolumeMute,
  IoCloseOutline,
} from "react-icons/io5";
import { GrScorecard } from "react-icons/gr";
import { TbMusicOff } from "react-icons/tb";
import { FaQuestion } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const Menu = ({
  end,
  soundMuted,
  setSoundMuted,
  musicMuted,
  setMusicMuted,
  inStartScreen,
  setShowHelp,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const startScreen =
    "hover:bg-primaryClrOne rounded-full dark:text-slate-400 text-primaryClrOne dark:hover:text-white/80 hover:text-white";
  const playScreen =
    "hover:bg-accentClrOne rounded-full dark:text-slate-400 text-accentClrOne dark:hover:text-white/80 hover:text-white ";

  const menuVariants = {
    hidden: { height: 0 },
    visible: { height: "auto" },
  };

  const closeGame = () => {
    setShowMenu(false);
    setTimeout(end, 0);
  };

  const muteSound = (e) => {
    e.stopPropagation();
    setSoundMuted(!soundMuted);
  };

  const toggleMusic = (e) => {
    e.stopPropagation();
    setMusicMuted(!musicMuted);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const showHelp = () => {
    setShowMenu(false);
    setShowHelp(true);
  };

  return (
    <div
      className={`${showMenu && "fixed inset-0  z-20"}`}
      onClick={() => setShowMenu(false)}>
      <div
        className={`absolute p-1 top-0 left-1 sm:left-3 z-20 flex flex-col  rounded-full overflow-hidden ${
          showMenu && "dark:bg-white/10 backdrop-blur-md bg-accentClrOne/20"
        }`}>
        <button
          className={`${inStartScreen ? startScreen : playScreen} p-1`}
          onClick={handleClick}>
          {showMenu ? (
            <IoCloseOutline fontSize={45} />
          ) : (
            <CiMenuKebab fontSize={45} />
          )}
        </button>
        <motion.div
          className='mt-6 w-full flex flex-col gap-1 items-center'
          initial='hidden'
          animate={showMenu ? "visible" : "hidden"}
          variants={menuVariants}>
          <button className={`${inStartScreen ? startScreen : playScreen} p-2`}>
            <GrScorecard fontSize={35} />
          </button>
          <button
            className={`${inStartScreen ? startScreen : playScreen} p-2`}
            onClick={toggleMusic}>
            {!musicMuted ? (
              <TbMusicOff fontSize={35} />
            ) : (
              <IoMusicalNotes fontSize={35} />
            )}
          </button>
          <button
            className={`${inStartScreen ? startScreen : playScreen} p-2`}
            onClick={muteSound}>
            {soundMuted ? (
              <IoVolumeMedium fontSize={35} />
            ) : (
              <IoVolumeMute fontSize={35} />
            )}
          </button>
          {!inStartScreen && (
            <button
              className={`${inStartScreen ? startScreen : playScreen} p-2`}
              onClick={closeGame}>
              <IoExitOutline fontSize={35} />
            </button>
          )}
          <button
            className={`${inStartScreen ? startScreen : playScreen} p-2`}
            onClick={showHelp}>
            <FaQuestion fontSize={30} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
