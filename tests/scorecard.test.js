const Scorecard = require("../src/scorecard");
const Frame = require("../src/frame");

describe("scorecard", () => {
  it("given a frame of 3 and 4, calculateScore saves the score", () => {
    const scorecard = new Scorecard();
    const frame = new Frame(3, 4);
    scorecard.addFrame(frame);
    scorecard.calculateScore();
    expect(scorecard.score).toEqual([7]);
  });
  it("given 2 frames (3,4) and (2,6), calculateScore returns 15", () => {
    const scorecard = new Scorecard();
    const frame1 = new Frame(3, 4);
    const frame2 = new Frame(2, 6);
    scorecard.addFrame(frame1);
    scorecard.addFrame(frame2);
    scorecard.calculateScore();
    expect(scorecard.score).toEqual([7, 15]);
  });
  // it('given (7,3) then (3,4), calculateScore returns 24', () => {
  //   const frames = new Frames()
  //   const scorecard = new Scorecard()
  //   frames.addFrame(7,3)
  //   frames.addFrame(3,4)
  //   expect(scorecard.calculateScore(frames)).toBe(20)
  // })
  // it('given (10),(4,5), calculateScore returns 28', () => {
  //   const frames = new Frames()
  //   const scorecard = new Scorecard()
  //   frames.addFrame(10)
  //   frames.addFrame(4,5)
  //   expect(scorecard.calculateScore(frames)).toBe(28)
  // })
  // it('given (10),(8,2),(5,3), calculateScore returns 43', () => {
  //   const frames = new Frames()
  //   const scorecard = new Scorecard()
  //   frames.addFrame(10)
  //   frames.addFrame(8,2)
  //   frames.addFrame(5,3)
  //   expect(scorecard.calculateScore(frames)).toBe(43)
  // })
  // it('given (10),(10),(4,3), calculateScore returns 48', () => {
  //   const frames = new Frames()
  //   const scorecard = new Scorecard()
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(4,3)
  //   expect(scorecard.calculateScore(frames)).toBe(48)
  // })
  // it('given (10),(10),(10),(10),(7,3),(10),(6,4),(5,4) calculateScore returns 171', () => {
  //   const frames = new Frames()
  //   const scorecard = new Scorecard()
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(7,3)
  //   frames.addFrame(10)
  //   frames.addFrame(6,4)
  //   frames.addFrame(5,4)
  //   expect(scorecard.calculateScore(frames)).toBe(171)
  //   expect(scorecard.score).toEqual([30,60,87,107,127,147,162,171])
  // })
  // it('given perfect game, calculateScore returns 300', () => {
  //   const frames = new Frames()
  //   const scorecard = new Scorecard()
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(10,10,10)
  //   expect(scorecard.calculateScore(frames)).toBe(300)
  // })
  // it('given a game of open frames, calculateScore returns 20', () => {
  //   const frames = new Frames()
  //   const scorecard = new Scorecard()
  //   frames.addFrame(1,1)
  //   frames.addFrame(1,1)
  //   frames.addFrame(1,1)
  //   frames.addFrame(1,1)
  //   frames.addFrame(1,1)
  //   frames.addFrame(1,1)
  //   frames.addFrame(1,1)
  //   frames.addFrame(1,1)
  //   frames.addFrame(1,1)
  //   frames.addFrame(1,1)
  //   expect(scorecard.calculateScore(frames)).toBe(20)
  // })
  // it('given a game of spares, calculateScore returns 50', () => {
  //   const frames = new Frames()
  //   const scorecard = new Scorecard()
  //   frames.addFrame(5,5)
  //   frames.addFrame(5,5)
  //   frames.addFrame(5,5)
  //   frames.addFrame(5,5)
  //   frames.addFrame(5,5)
  //   frames.addFrame(5,5)
  //   frames.addFrame(5,5)
  //   frames.addFrame(5,5)
  //   frames.addFrame(5,5)
  //   frames.addFrame(5,5,5)
  //   expect(scorecard.calculateScore(frames)).toBe(150)
  // })
  // it('given a game, calculateScore returns 50', () => {
  //   const frames = new Frames()
  //   const scorecard = new Scorecard()
  //   frames.addFrame(6,4)
  //   frames.addFrame(10)
  //   frames.addFrame(4,5)
  //   frames.addFrame(10)
  //   frames.addFrame(6,4)
  //   frames.addFrame(10)
  //   frames.addFrame(10)
  //   frames.addFrame(7,2)
  //   frames.addFrame(10)
  //   frames.addFrame(5,3)
  //   expect(scorecard.calculateScore(frames)).toBe(169)
  //   expect(scorecard.score).toEqual([20,39,48,68,88,115,134,143,161,169])
  // })
  // it('given no frames, calculateScore doesnt do anything', () => {
  //   const frames = new Frames()
  //   const scorecard = new Scorecard()
  //   expect(scorecard.calculateScore(frames)).toBe(null)
  // })
});
