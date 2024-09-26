const BoardGenerator = require("../src/boardGenerator.js");
const FrameLineGenerator = require("../src/frameLineGenerator.js")

// jest.mock('../lib/frameLineGenerator.js')
const frame = (throw1, throw2 = 0, throw3 = 0) => {
  return {
    throw1: throw1,
    throw2: throw2,
    throw3: throw3,
    isSpare: jest.fn().mockReturnValue(false),
    isStrike: jest.fn().mockReturnValue(false),
  };
};
describe("generate board", () => {
  it("given no name, no frames and no score", () => {
    // --- trying to mock the class ---
    // const mockFrameLineGenerator = new FrameLineGenerator()
    // mockFrameLineGenerator.generate.mockImplementation(() => [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "])
    // --- mocking a specific method of a class ---
    const mockGenerate = jest
    .spyOn(FrameLineGenerator.prototype, "generate")
    .mockImplementation(() => [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "])
    const generateBoard = new BoardGenerator();
    const frames = [];
    const score = [];
    const board = [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |     |",
      "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |     |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
    expect(generateBoard.getBoard(frames, score)).toEqual(board);
  });
  it("given a name Joe, no frames and no score", () => {
    const mockGenerate = jest
    .spyOn(FrameLineGenerator.prototype, "generate")
    .mockImplementation(() => [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "])
    const generateBoard = new BoardGenerator();
    generateBoard.giveName("Joe");
    const frames = [];
    const score = [];
    const board = [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |     |",
      "|   Joe    +---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |     |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
    expect(generateBoard.getBoard(frames, score)).toEqual(board);
  });
  it("given Averylongname, emptyBoard with create an empty board with a name", () => {
    const mockGenerate = jest
    .spyOn(FrameLineGenerator.prototype, "generate")
    .mockImplementation(() => [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "])
    const generateBoard = new BoardGenerator();
    generateBoard.giveName("Averylongname");
    const frames = [];
    const score = [];
    const board = [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |     |",
      "| Averylon +---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |     |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
    expect(generateBoard.getBoard(frames, score)).toEqual(board);
  });
  it('given a name of joe, formatName returns "   Joe    "', () => {
    const generateBoard = new BoardGenerator();
    generateBoard.giveName("Joe");
    expect(generateBoard.name).toBe("   Joe    ");
  });
  it('given a name of averylongname, formatName returns " averylon "', () => {
    const generateBoard = new BoardGenerator();
    generateBoard.giveName("averylongname");
    expect(generateBoard.name).toBe(" averylon ");
  });
  it('given a name of averylongname, formatName returns " averylon "', () => {
    const generateBoard = new BoardGenerator();
    generateBoard.giveName("john");
    expect(generateBoard.name).toBe("   john   ");
  });

  it("given frames of (3,4) and a score of [7]", () => {
    const mockGenerate = jest
    .spyOn(FrameLineGenerator.prototype, "generate")
    .mockImplementation(() => [3,4," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",])
    const frames = [frame(3, 4)];
    const score = [7];
    const generateBoard = new BoardGenerator();
    const board = [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |3 4|   |   |   |   |   |   |   |   |     |     |",
      "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |  7|   |   |   |   |   |   |   |   |     |     |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
    expect(generateBoard.getBoard(frames, score)).toEqual(board);
  });
  it("given frames of (3,4)(2,4)(5,3) show board returns board", () => {
    const mockGenerate = jest
    .spyOn(FrameLineGenerator.prototype, "generate")
    .mockImplementation(() => [3,4,2,4,5,3," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",])
    const frames = [frame(3, 4), frame(2, 4), frame(5, 3)];
    const score = [7, 12, 20];
    const generateBoard = new BoardGenerator();
    const board = [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |3 4|2 4|5 3|   |   |   |   |   |   |     |     |",
      "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |  7| 12| 20|   |   |   |   |   |   |     |     |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
    expect(generateBoard.getBoard(frames, score)).toEqual(board);
  });
  it("given a perfect game", () => {
    const mockGenerate = jest
    .spyOn(FrameLineGenerator.prototype, "generate")
    .mockImplementation(() => ["X"," ","X"," ","X"," ","X"," ","X"," ","X"," ","X"," ","X"," ","X"," ","X","X","X",])
    const frame1 = frame(10);
    frame1.isStrike.mockReturnValue(true);
    const frame2 = frame(10, 10, 10);
    frame2.isStrike.mockReturnValue(true);
    const frames = [
      frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame2
    ];

    const score = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300];
    const generateBoard = new BoardGenerator();
    const board = [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |X  |X  |X  |X  |X  |X  |X  |X  |X  |X X X|     |",
      "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          | 30| 60| 90|120|150|180|210|240|270| 300 |     |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
    expect(generateBoard.getBoard(frames, score)).toEqual(board);
  });
  it("given a game of spares", () => {
    const mockGenerate = jest
    .spyOn(FrameLineGenerator.prototype, "generate")
    .mockImplementation(() => [5,"/",5,"/",5,"/",5,"/",5,"/",5,"/",5,"/",5,"/",5,"/",5,"/",5,])
    const frame1 = frame(5,5)
    const frame2 = frame(5,5,5)
    frame1.isSpare.mockReturnValue(true)
    frame2.isSpare.mockReturnValue(true)
    frames = [
      frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame2
    ]
    const score = [15,30,45,60,75,90,105,120,135,150];
    const generateBoard = new BoardGenerator();
    const board = [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |5 /|5 /|5 /|5 /|5 /|5 /|5 /|5 /|5 /|5 / 5|     |",
      "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          | 15| 30| 45| 60| 75| 90|105|120|135| 150 |     |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
    expect(generateBoard.getBoard(frames, score)).toEqual(board);
  });
  it("given a maximum score, it is shown on the board", () => {
    const mockGenerate = jest
    .spyOn(FrameLineGenerator.prototype, "generate")
    .mockImplementation(() => [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "])
    const generateBoard = new BoardGenerator();
    const frames = [];
    const score = [];
    const board = [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |     |",
      "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     | 300 |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
    expect(generateBoard.getBoard(frames, score, 300)).toEqual(board);
  });

  it("given a 2 digit maximum score, it is shown on the board", () => {
    const mockGenerate = jest
    .spyOn(FrameLineGenerator.prototype, "generate")
    .mockImplementation(() => [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "])
    const generateBoard = new BoardGenerator();
    const frames = [];
    const score = [];
    const board = [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |     |",
      "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |  30 |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
    expect(generateBoard.getBoard(frames, score, 30)).toEqual(board);
  });
  it("given a 1 digit maximum score, it is shown on the board", () => {
    const mockGenerate = jest
    .spyOn(FrameLineGenerator.prototype, "generate")
    .mockImplementation(() => [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "])
    const generateBoard = new BoardGenerator();
    const frames = [];
    const score = [];
    const board = [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |     |",
      "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |   |   |   |   |   |   |   |   |   |     |   0 |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
    expect(generateBoard.getBoard(frames, score, 0)).toEqual(board);
  });
});
