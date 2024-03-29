import { useState, useEffect, useRef } from "react";

const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const intervalId = useRef(null);

  const startTimer = () => {
    if (!intervalId.current) {
      setSeconds(0);
      setMinutes(0);
      intervalId.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    if (seconds === 59) {
      setSeconds(0);
      setMinutes((prevMinutes) => prevMinutes + 1);
    }
  }, [seconds]);

  const stopTimer = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  const resetTimer = () => {
    setSeconds(0);
    setMinutes(0);
  };

  const getTotalSeconds = () => {
    return minutes * 60 + seconds;
  };

  useEffect(() => {
    return () => clearInterval(intervalId.current); // Cleanup on unmount
  }, []);

  return {
    seconds,
    resetTimer,
    minutes,
    getTotalSeconds,
    startTimer,
    stopTimer,
  };
};

export default useTimer;
