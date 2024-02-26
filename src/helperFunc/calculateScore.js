const calculateScore = (tryCount, time) => {
  const tryFactor = Math.round((1 / parseInt(tryCount)) * 1000);
  const timeFactor = Math.round((1 / parseInt(time)) * 1000);
  const score = tryFactor + timeFactor;
  return score;
};

export default calculateScore;
