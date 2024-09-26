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
  it("given no frames, calculateMaxScore returns 300", () => {
    const scorecard = new Scorecard();
    expect(scorecard.calculateMaxScore()).toBe(300)
  })
  it("given a strike frames, calculateMaxScore returns 300", () => {
    const scorecard = new Scorecard();
    const frame1 = new Frame(10)
    scorecard.addFrame(frame1)
    expect(scorecard.calculateMaxScore()).toBe(300)
  })
  it("given a spareframe, calculateMaxScore returns 290", () => {
    const scorecard = new Scorecard();
    const frame1 = new Frame(6,4)
    scorecard.addFrame(frame1)
    expect(scorecard.calculateMaxScore()).toBe(290)
  })
  it("given an open frame, calculateMaxScore returns 277", () => {
    const scorecard = new Scorecard();
    const frame1 = new Frame(3,4)
    scorecard.addFrame(frame1)
    expect(scorecard.calculateMaxScore()).toBe(277)
  })
  it("given a terrible frame, calculateMaxScore returns 270", () => {
    const scorecard = new Scorecard();
    const frame1 = new Frame(0,0)
    scorecard.addFrame(frame1)
    expect(scorecard.calculateMaxScore()).toBe(270)
  })
  it("given a complete game, maxscore returns final score returns", () => {
    const scorecard = new Scorecard();
    const frame1 = new Frame(5,5)
    const frame2 = new Frame(5,5,5)
    scorecard.addFrame(frame1);
    scorecard.addFrame(frame1);
    scorecard.addFrame(frame1);
    scorecard.addFrame(frame1);
    scorecard.addFrame(frame1);
    scorecard.addFrame(frame1);
    scorecard.addFrame(frame1);
    scorecard.addFrame(frame1);
    scorecard.addFrame(frame1);
    scorecard.addFrame(frame2);
    expect(scorecard.calculateMaxScore()).toBe(150)
  })
});
