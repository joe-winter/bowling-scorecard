const ScoreCalculator = require('./scoreCalculator')
class Scorecard {
  constructor() {
    this.frames = []
    this.score = [];
  }

  addFrame(frame) {
    this.frames.push(frame)
  }

  calculateScore() {
    const scoreCalculator = new ScoreCalculator()
    this.score = scoreCalculator.calculateScore(this.frames)
  }
}


module.exports = Scorecard;
