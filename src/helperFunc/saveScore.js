import calculateScore from "../helperFunc/calculateScore";

const saveScore = (tryCount, seconds, minutes, value, scoreInSeconds) => {
  const formerScores = JSON.parse(localStorage.getItem("scores")) || [];
  const score = calculateScore(tryCount, scoreInSeconds);
  let level;

  if (value == 8) {
    level = "easy";
  } else if (value == 16) {
    level = "medium";
  } else {
    level = "hard";
  }

  let scoreObj = {
    level,
    date: Date.now(),
    tryCount,
    timeFinished: `${minutes}:${seconds}`,
    score,
  };

  formerScores.push(scoreObj);

  console.log(scoreObj);
  console.log("Former scores: ", formerScores);

  localStorage.setItem("scores", JSON.stringify(formerScores));
};

export default saveScore;
