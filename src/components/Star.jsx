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

  return <motion.div></motion.div>;
};

const StarField = ({ numStars }) => {
  const stars = useMemo(
    () => [...Array(numStars)].map((_, index) => <Star />),
    [numStars]
  );

  return <div></div>;
};

export default StarField;
