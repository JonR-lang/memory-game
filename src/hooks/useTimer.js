import { useState, useEffect, useRef } from "react";

const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef(null);

  const startTimer = () => {
    console.log(intervalId.current);
    if (!intervalId.current) {
      setIsRunning(true);
      setSeconds(0);
      setMinutes(0);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    intervalId.current = null;
  };

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        if (seconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);
        } else {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
      console.log(seconds, minutes);
    } else {
      clearInterval(intervalId.current);
    }
    return () => clearInterval(intervalId.current);
  }, [isRunning, seconds]);

  return {
    seconds,
    minutes,
    startTimer,
    stopTimer,
  };
};

export default useTimer;
