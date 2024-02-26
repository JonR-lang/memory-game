import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";

//hooks
import useDarkMode from "./hooks/theme";
import useTimer from "./hooks/useTimer";

//components
import StarField from "./components/Star";
import EndGame from "./components/EndGame";
import Help from "./components/Help";
import Menu from "./components/Menu";
import Timer from "./components/Timer";

//sounds
import Flip from "./assets/flip.wav";
import WinSound from "./assets/bonus-point.mp3";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start, musicMuted, setMusicMuted }) {
  const [soundMuted, setSoundMuted] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const inStartScreen = true;

  const handleDarkMode = () => {
    toggleDarkMode(!isDarkMode);
  };

  return (
    <>
      <button
        className='absolute inline-flex items-center custom-cursor-pointer right-3 top-3 z-10'
        onClick={handleDarkMode}>
        <div className="w-11 h-6 bg-sky-100 focus:outline-none focus:ring-2 rounded-full dark:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-orange-500 after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-darkGray dark:after:shadow-crescent dark:after:bg-darkGray shadow-md"></div>
      </button>

      <Menu
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
        musicMuted={musicMuted}
        setMusicMuted={setMusicMuted}
        inStartScreen={inStartScreen}
        setShowHelp={setShowHelp}
      />

      {showHelp && <Help setShowHelp={setShowHelp} />}

      <>
        <div className='w-full h-screen flex justify-center items-center p-8 dark:custom-bg-start-mobile dark:sm:custom-bg-start custom-cursor'>
          <div className='w-full max-w-md aspect-square bg-neutralClrOne rounded-xl flex justify-center items-center flex-col space-y-8 text-primaryClrOne dark:bg-pink-950/20 dark:text-pink-500/80 z-10'>
            <h1 className='text-5xl font-bold'>Memory</h1>
            <p>Flip over tiles looking for pairs</p>
            <button
              onClick={start}
              className='text-white dark:text-slate-900 bg-gradient-to-b from-primaryClrOne/30 to-primaryClrOne p-3 px-12 rounded-full hover:scale-105 duration-200 ease-linear custom-cursor-pointer'>
              Play
            </button>
          </div>
          <StarField numStars={30} />
        </div>
      </>
    </>
  );
}

export function PlayScreen({ end, start, musicMuted, setMusicMuted }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);
  const [selectedValue, setSelectedValue] = useState(16);
  const [showEndGame, setShowEndGame] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);

  //hooks
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {
    seconds,
    minutes,
    startTimer,
    stopTimer,
    resetTimer,
    getTotalSeconds,
  } = useTimer();

  //game audio
  const flipSoundRef = useRef(new Audio(Flip));
  const winSoundRef = useRef(new Audio(WinSound));

  const handleDarkMode = () => {
    toggleDarkMode(!isDarkMode);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedValue(value);
    stopTimer();
    resetTimer();
  };

  useEffect(() => {
    setTiles(null);
    setTryCount(0);
  }, [selectedValue]);

  useEffect(() => {
    //preload both sounds!
    flipSoundRef.current.preload = "auto";
    winSoundRef.current.preload = "auto";
  });

  const playFlipSound = () => {
    if (soundMuted) flipSoundRef.current.play();
  };

  const playWinSound = () => {
    if (soundMuted) winSoundRef.current.play();
  };

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    playFlipSound();
    startTimer();
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        setTimeout(() => {
          playWinSound();
          confetti({
            ticks: 100,
            particleCount: 300,
            spread: 100,
          });
        }, 1000);

        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setShowEndGame(true);
            stopTimer();
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <div className='absolute right-3 top-3 flex gap-2 items-center z-10 justify-center'>
        <Timer seconds={seconds} minutes={minutes} />
        <div className='flex items-center gap-1 justify-center'>
          <p className='text-slate-800 dark:text-slate-300'>Level:</p>
          <select
            value={selectedValue}
            onChange={handleChange}
            className='dark:bg-slate-950 dark:text-slate-400 px-2'>
            <option value='8'>Easy</option>
            <option value='16'>Medium</option>
            <option value='32'>Hard</option>
          </select>
        </div>

        <button
          className='inline-flex items-center custom-cursor-pointer relative'
          onClick={handleDarkMode}>
          <div className="w-11 h-6 bg-sky-100 focus:outline-none focus:ring-2 rounded-full dark:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-orange-500 after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-darkGray dark:after:shadow-crescent dark:after:bg-darkGray shadow-md"></div>
        </button>
      </div>

      <Menu
        end={end}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
        musicMuted={musicMuted}
        setMusicMuted={setMusicMuted}
        setShowHelp={setShowHelp}
      />

      <div className='min-h-screen overflow-y-auto w-full flex items-center justify-center p-4 flex-col gap-4 text-center dark:custom-bg-mobile dark:sm:custom-bg custom-cursor'>
        <span className='w-full flex items-center justify-center gap-2 text-xl text-accentClrOne sm:text-2xl lg:text-3xl'>
          Tries
          <span className='inline-block rounded-md bg-primaryClrTwo px-2 dark:bg-transparent sm:h-7 sm:-mt-1'>
            {tryCount}
          </span>
        </span>

        {showEndGame && (
          <EndGame
            tryCount={tryCount}
            start={start}
            end={end}
            setShowEndGame={setShowEndGame}
            getTotalSeconds={getTotalSeconds}
            setTiles={setTiles}
            setTryCount={setTryCount}
            resetTimer={resetTimer}
          />
        )}

        {showHelp && <Help setShowHelp={setShowHelp} />}

        <StarField numStars={20} />
        <div className='w-full backdrop-blur-md max-w-md aspect-square rounded-xl overflow-hidden'>
          <div
            className={
              "w-full h-full p-3 grid grid-cols-4 place-items-center gap-3 dark:bg-black/40 bg-neutralClrTwo "
            }>
            {getTiles(selectedValue).map((tile, i) => (
              <Tile key={i} flip={() => flip(i)} {...tile} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
