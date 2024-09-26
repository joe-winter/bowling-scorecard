const ScoreCalculator = require('./scoreCalculator')
const Frame = require('./frame')
const scoreCalculator = new ScoreCalculator()
class Scorecard {
  constructor() {
    this.frames = []
    this.score = [];
  }

  addFrame(frame) {
    this.frames.push(frame)
  }

  calculateScore() {
    this.score = scoreCalculator.calculateScore(this.frames)
  }

  calculateMaxScore() {
    const remainingFrames = 10 - this.frames.length
    if (remainingFrames === 0) {
      return scoreCalculator.calculateScore(this.frames).slice(-1)[0]
    }
    const maxFrames = this.frames.concat(Array(remainingFrames-1).fill(new Frame(10)))
    maxFrames.push(new Frame(10,10,10))
    return scoreCalculator.calculateScore(maxFrames).slice(-1)[0]
  }
}


module.exports = Scorecard;
