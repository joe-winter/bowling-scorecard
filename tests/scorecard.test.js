const Scorecard = require('../lib/scorecard')

describe('scorecard', () => {
  it('given a frame of 3 and 4, calculateScore returns 7', () => {
    const scorecard = new Scorecard()
    scorecard.addFrame(3,4)
    expect(scorecard.calculateScore()).toBe(7)
  })
})
