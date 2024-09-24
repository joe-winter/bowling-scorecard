const FrameLineGenerator = require("../src/frameLineGenerator")
const frame = (throw1, throw2 = 0, throw3 = 0) => {
  return {
    throw1: throw1,
    throw2: throw2,
    throw3: throw3,
    isSpare: jest.fn().mockReturnValue(false),
    isStrike: jest.fn().mockReturnValue(false),
  };
};
describe("FrameLineGenerator", () => {
  it("Given no frames, it returns an empty line", () => {
    const frameLineGenerator= new FrameLineGenerator();
    const frames = [];
    const line = "   |   |   |   |   |   |   |   |   |     |"
    expect(frameLineGenerator.generate(frames)).toEqual(line);
  });
  it("given frames of (3,4)", () => {
    const frameLineGenerator= new FrameLineGenerator();
    const frames = [frame(3, 4)];
    const line = "3 4|   |   |   |   |   |   |   |   |     |"
    expect(frameLineGenerator.generate(frames)).toEqual(line);
  });
  it("given a perfect game", () => {
    const frameLineGenerator= new FrameLineGenerator();
    const frame1 = frame(10)
    frame1.isStrike.mockReturnValue(true)
    const frame2 = frame(10,10,10)
    frame2.isStrike.mockReturnValue(true)
    const frames = [
      frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame2
    ];
    
    const line = "X  |X  |X  |X  |X  |X  |X  |X  |X  |X X X|"
    expect(frameLineGenerator.generate(frames)).toEqual(line);
  });
  it('given a game of spares', () => {
      const frameLineGenerator= new FrameLineGenerator();
      const frame1 = frame(5,5)
      const frame2 = frame(5,5,5)
      frame1.isSpare.mockReturnValue(true)
      frame2.isSpare.mockReturnValue(true)
      frames = [
        frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame2
      ]
      const line = "5 /|5 /|5 /|5 /|5 /|5 /|5 /|5 /|5 /|5 / 5|"
      expect(frameLineGenerator.generate(frames)).toEqual(line);
  });
  
  it('given a game', () => {
      const frameLineGenerator= new FrameLineGenerator();
      const frame1 = frame(6,4)
      frame1.isSpare.mockReturnValue(true)
      const frame2 = frame(10)
      frame2.isStrike.mockReturnValue(true)
      const frame3 = frame(4,5)
      const frame4 = frame(7,2)
      const frame5 = frame(10,5,3)
      frame5.isStrike.mockReturnValue(true);
      frames = [
        frame1,frame2,frame3,frame2,frame1,frame2,frame2,frame4,frame2,frame5
      ]
      const line = "6 /|X  |4 5|X  |6 /|X  |X  |7 2|X  |X 5 3|"
      expect(frameLineGenerator.generate(frames)).toEqual(line);
  });

})
