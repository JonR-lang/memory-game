import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const Star = ({ initialX, initialY }) => {
  const [direction, setDirection] = useState(Math.random() < 0.5 ? -1 : 1);
  const speed = Math.random() * 60 + 30; //This will give each star a random speed:)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDirection((prevDirection) => -prevDirection);
    }, Math.random() * 2000 + 1000); //This is meant to give a random interval between 1 and 3 seconds!:)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "2px",
        height: "2px",
        backgroundColor: "white",
        borderRadius: "50%",
        top: initialY,
        left: initialX,
      }}
      animate={{
        x: `${direction === 1 ? "100vw" : "-100vw"}`,
        y: `${direction === 1 ? "100vh" : "-100vh"}`,
      }}
      transition={{
        duration: speed,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  );
};

const StarField = ({ numStars }) => {
  const stars = useMemo(
    () =>
      [...Array(numStars)].map((_, index) => (
        <Star
          key={index}
          initialX={`${Math.random() * window.innerWidth}px`}
          initialY={`${Math.random() * window.innerHeight}px`}
        />
      )),
    [numStars]
  );

  return (
    <div className='absolute inset-0 overflow-hidden hidden dark:block'>
      {stars}
    </div>
  );
};

export default StarField;
