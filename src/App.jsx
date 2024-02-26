import { useEffect, useState } from "react";
import { StartScreen, PlayScreen } from "./Screens";
import BackgroundMusic from "./assets/spa-relax.mp3";

function App() {
  const [gameState, setGameState] = useState(() => {
    const savedState = JSON.parse(localStorage.getItem("memoryGame"));
    return savedState || "start";
  });
  const [musicMuted, setMusicMuted] = useState(false);
  const bgMusic = new Audio(BackgroundMusic);
  bgMusic.preload = "auto";
  bgMusic.volume = 0.2;

  useEffect(() => {
    localStorage.setItem("memoryGame", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    if (musicMuted) bgMusic.play();

    bgMusic.addEventListener("ended", () => {
      bgMusic.currentTime = 0;
      bgMusic.play();
    });

    return () => {
      bgMusic.pause();
      bgMusic.removeEventListener("ended", () => {
        bgMusic.currentTime = 0;
        bgMusic.play();
      });
    };
  }, [musicMuted]);

  switch (gameState) {
    case "start":
      return (
        <StartScreen
          start={() => setGameState("play")}
          musicMuted={musicMuted}
          setMusicMuted={setMusicMuted}
        />
      );
    case "play":
      return (
        <PlayScreen
          end={() => setGameState("start")}
          start={() => setGameState("play")}
          musicMuted={musicMuted}
          setMusicMuted={setMusicMuted}
        />
      );
    default:
      throw new Error("Invalid game state " + gameState);
  }
}

export default App;
