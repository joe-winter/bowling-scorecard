const ScoreCalculator = require("../src/scoreCalculator");

describe("ScoreCalculator", () => {
  beforeAll(() => {});
  it("calculatescore returns array after one open frame", () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(3, 4);
    frame1.total.mockReturnValue(7);
    const frames = [frame1];
    expect(scoreCalculator.calculateScore(frames)).toEqual([7]);
  });
  it("calculatescore returns array after two open frames", () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(3, 4);
    frame1.total.mockReturnValue(7);
    const frame2 = frame(0, 3);
    frame2.total.mockReturnValue(3);
    const frames = [frame1, frame2];
    expect(scoreCalculator.calculateScore(frames)).toEqual([7, 10]);
  });
  it("calculatescore returns an array of 10 if the first frame is a spare", () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(7, 3);
    frame1.total.mockReturnValue(10);
    frame1.isSpare.mockReturnValue(true);
    const frames = [frame1];
    expect(scoreCalculator.calculateScore(frames)).toEqual([10]);
  });
  it("calculatescore returns an array of 13, 20 if the first frame is a spare and second is an open frame", () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(3, 7);
    const frame2 = frame(3, 4);
    frame1.total.mockReturnValue(10);
    frame2.total.mockReturnValue(7);
    frame1.isSpare.mockReturnValue(true);
    const frames = [frame1, frame2];
    expect(scoreCalculator.calculateScore(frames)).toEqual([13, 20]);
  });
  it("calculatescore returns an array of 10 if frames is a strike", () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(10);
    frame1.total.mockReturnValue(10);
    frame1.isStrike.mockReturnValue(true);
    const frames = [frame1];
    expect(scoreCalculator.calculateScore(frames)).toEqual([10]);
  });
  it("calculatescore returns an array of 17 24if frames are (10),(3,4)", () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(10);
    const frame2 = frame(3, 4);
    frame1.total.mockReturnValue(10);
    frame2.total.mockReturnValue(7);
    frame1.isStrike.mockReturnValue(true);
    const frames = [frame1, frame2];
    expect(scoreCalculator.calculateScore(frames)).toEqual([17, 24]);
  });
  it("calculatescore returns an 19 31 40 if frames are (3,7),(9,1),(2,7) ", () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(3, 7);
    const frame2 = frame(9, 1);
    const frame3 = frame(2, 7);
    frame1.total.mockReturnValue(10);
    frame2.total.mockReturnValue(10);
    frame3.total.mockReturnValue(9);
    frame1.isSpare.mockReturnValue(true);
    frame2.isSpare.mockReturnValue(true);
    const frames = [frame1, frame2, frame3];
    expect(scoreCalculator.calculateScore(frames)).toEqual([19, 31, 40]);
  });
  it("calculatescore returns an 30 50 60 if for three strikes in a row", () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(10);
    frame1.total.mockReturnValue(10);
    frame1.isStrike.mockReturnValue(true);
    const frames = [frame1, frame1, frame1];
    expect(scoreCalculator.calculateScore(frames)).toEqual([30, 50, 60]);
  });
  it('given (10),(10),(10),(10),(7,3),(10),(6,4),(5,4) calculateScore returns 171', () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(10)
    const frame2 = frame(7,3)
    const frame3 = frame(6,4)
    const frame4 = frame(5,4)
    frame1.total.mockReturnValue(10);
    frame2.total.mockReturnValue(10);
    frame3.total.mockReturnValue(10);
    frame4.total.mockReturnValue(9);
    frame1.isStrike.mockReturnValue(true);
    frame2.isSpare.mockReturnValue(true);
    frame3.isSpare.mockReturnValue(true);
    const frames = [frame1,frame1,frame1,frame1,frame2,frame1,frame3,frame4];
    expect(scoreCalculator.calculateScore(frames)).toEqual([30,60,87,107,127,147,162,171])
  })
  it('given a perfect game, calculateScore returns 30,60,90,120,150,180,210,240,270,300', () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(10)
    const frame2 = frame(10,10,10)
    frame1.total.mockReturnValue(10);
    frame1.isStrike.mockReturnValue(true);
    frame2.total.mockReturnValue(30);
    frame2.isStrike.mockReturnValue(true);
    frames = [frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame2]
    expect(scoreCalculator.calculateScore(frames)).toEqual([30,60,90,120,150,180,210,240,270,300])
  })
  it('given a bad game, calculateScore returns 2,4,6,8,10,12,14,16,18,20', () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(1,1)
    frame1.total.mockReturnValue(2);
    frames = [frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1]
    expect(scoreCalculator.calculateScore(frames)).toEqual([2,4,6,8,10,12,14,16,18,20])
  })
  it('given a game of spares, calculateScore returns 15,30,45,60,75,90,105,120,135,150', () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(5,5)
    const frame2 = frame(5,5,5)
    frame1.total.mockReturnValue(10);
    frame1.isSpare.mockReturnValue(true)
    frame2.total.mockReturnValue(15);
    frame2.isSpare.mockReturnValue(true)
    frames = [frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame2]
    expect(scoreCalculator.calculateScore(frames)).toEqual([15,30,45,60,75,90,105,120,135,150])
  })
  it('given a game, calculateScore returns 20,39,48,68,88,115,134,143,161,169', () => {
    const scoreCalculator = new ScoreCalculator();
    const frame1 = frame(6,4)
    frame1.total.mockReturnValue(10);
    frame1.isSpare.mockReturnValue(true)
    const frame2 = frame(10)
    frame2.total.mockReturnValue(10);
    frame2.isStrike.mockReturnValue(true)
    const frame3 = frame(4,5)
    frame3.total.mockReturnValue(9);
    const frame4 = frame(7,2)
    frame4.total.mockReturnValue(9);
    const frame5 = frame(10,5,3)
    frame5.total.mockReturnValue(18);
    frame5.isStrike.mockReturnValue(true);
    frames = [frame1,frame2,frame3,frame2,frame1,frame2,frame2,frame4,frame2,frame5]
    expect(scoreCalculator.calculateScore(frames)).toEqual([20,39,48,68,88,115,134,143,168,186])
  })
  const frame = (throw1, throw2 = 0, throw3 = 0) => {
    return {
      throw1: throw1,
      throw2: throw2,
      throw3: throw3,
      isSpare: jest.fn().mockReturnValue(false),
      isStrike: jest.fn().mockReturnValue(false),
      total: jest.fn(),
    };
  };
});
