class ScoreCalculator {
  calculateScore(frames) {
    const score = [];
    for (let i = 0; i < frames.length; i++) {
      if (frames[i].isStrike()) {
        score.push(
          frames[i].total() +
            (frames[i + 1]?.throw1 || 0) +
            (frames[i + 1]?.throw2 || frames[i + 2]?.throw1 || 0) +
            (score?.[i - 1] || 0)
        );
      } else if (frames[i].isSpare()) {
        score.push(
          frames[i].total() +
            (frames[i + 1]?.throw1 || 0) +
            (score?.[i - 1] || 0)
        );
      } else {
        score.push(frames[i].total() + (score?.[i - 1] || 0));
      }
    }
    return score;
  }
}


module.exports = ScoreCalculator;
