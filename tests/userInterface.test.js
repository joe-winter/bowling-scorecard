const UserInterface = require("../src/userInterface");
const BoardGenerator = require("../src/boardGenerator");
const Scorecard = require("../src/scorecard")

const frame = (throw1, throw2 = 0, throw3 = 0) => {
  return {
    throw1: throw1,
    throw2: throw2,
    throw3: throw3,
    isSpare: jest.fn().mockReturnValue(false),
    isStrike: jest.fn().mockReturnValue(false),
    total: jest.fn()
  };
}

describe("userinterface", () => {
  mockreadlineAysnc = jest.fn();
  const logSpy = jest.spyOn(global.console, "log");
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should give the user interface for the second frame once the first has finished", async () => {
    mockreadlineAysnc.mockResolvedValueOnce("5");
    mockreadlineAysnc.mockResolvedValueOnce("3");
    mockreadlineAysnc.mockResolvedValueOnce("1");
    mockreadlineAysnc.mockResolvedValueOnce("4");
    const scorecard = new Scorecard()
    const boardGenerator = new BoardGenerator()
    const userInterface = new UserInterface(mockreadlineAysnc, scorecard, boardGenerator);
    await userInterface.run();
    expect(logSpy).toHaveBeenNthCalledWith(1, "Frame 1:");
    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      [
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |   |   |   |   |   |   |   |   |   |     |     |",
        "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |   |   |   |   |   |   |   |   |   |     |     |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      ].join("\n")
    );
    expect(logSpy).toHaveBeenNthCalledWith(3,"Frame 1 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(1, "First Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(4,"Frame 1 - Possible Throw: 0,1,2,3,4,5");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(2, "Second Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(5, "Frame 2:");
    expect(logSpy).toHaveBeenNthCalledWith(
      6,
      [
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |5 3|   |   |   |   |   |   |   |   |     |     |",
        "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |  8|   |   |   |   |   |   |   |   |     |     |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      ].join("\n")
    );
    expect(logSpy).toHaveBeenNthCalledWith(
      7,
      "Frame 2 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10"
    );
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(3, "First Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(
      8,
      "Frame 2 - Possible Throw: 0,1,2,3,4,5,6,7,8,9"
    );
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(4, "Second Throw: ");
  });
  it("given a player gets a strike, the second throw isnt asked", async () => {
    mockreadlineAysnc.mockResolvedValueOnce("10");
    const scorecard = new Scorecard()
    const boardGenerator = new BoardGenerator()
    const userInterface = new UserInterface(mockreadlineAysnc, scorecard, boardGenerator);
    await userInterface.run();
    expect(logSpy).toHaveBeenNthCalledWith(1, "Frame 1:");
    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      [
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |   |   |   |   |   |   |   |   |   |     |     |",
        "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |   |   |   |   |   |   |   |   |   |     |     |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      ].join("\n")
    );
    expect(logSpy).toHaveBeenNthCalledWith(3,"Frame 1 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(1, "First Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(4,"Frame 2:");
  });
  it("given there has been nine frames, and the player gets three strikes in a row", async () => {
    mockreadlineAysnc.mockResolvedValueOnce("10");
    mockreadlineAysnc.mockResolvedValueOnce("10");
    mockreadlineAysnc.mockResolvedValueOnce("10");
    const scorecard = new Scorecard()
    const frame1 = frame(10)
    frame1.isStrike.mockReturnValue(true)
    frame1.total.mockReturnValue(10)
    scorecard.frames = [frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1]
    scorecard.score = [30,60,90,120,150,180,210,230,240]
    const boardGenerator = new BoardGenerator()
    const userInterface = new UserInterface(mockreadlineAysnc, scorecard, boardGenerator);
    await userInterface.run();
    expect(logSpy).toHaveBeenNthCalledWith(1, "Frame 10:");
    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      [
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |X  |X  |X  |X  |X  |X  |X  |X  |X  |     |     |",
        "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          | 30| 60| 90|120|150|180|210|230|240|     |     |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      ].join("\n")
    );
    expect(logSpy).toHaveBeenNthCalledWith(3,"Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(1, "First Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(4,"Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(2, "Second Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(5,"Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(3, "Third Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(6, "Final Score:");
    expect(logSpy).toHaveBeenNthCalledWith(
      7,
      [
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |X  |X  |X  |X  |X  |X  |X  |X  |X  |X X X|     |",
        "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          | 30| 60| 90|120|150|180|210|240|270|  300|     |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      ].join("\n")
    );
  })
  it("given there has been nine frames, and the player gets a spare and a third throw", async () => {
    mockreadlineAysnc.mockResolvedValueOnce("7");
    mockreadlineAysnc.mockResolvedValueOnce("3");
    mockreadlineAysnc.mockResolvedValueOnce("5");
    const scorecard = new Scorecard()
    const frame1 = frame(10)
    frame1.isStrike.mockReturnValue(true)
    frame1.total.mockReturnValue(10)
    scorecard.frames = [frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1]
    scorecard.score = [30,60,90,120,150,180,210,230,240]
    const boardGenerator = new BoardGenerator()
    const userInterface = new UserInterface(mockreadlineAysnc, scorecard, boardGenerator);
    await userInterface.run();
    expect(logSpy).toHaveBeenNthCalledWith(1, "Frame 10:");
    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      [
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |X  |X  |X  |X  |X  |X  |X  |X  |X  |     |     |",
        "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          | 30| 60| 90|120|150|180|210|230|240|     |     |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      ].join("\n")
    );
    expect(logSpy).toHaveBeenNthCalledWith(3,"Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(1, "First Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(4,"Frame 10 - Possible Throw: 0,1,2,3");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(2, "Second Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(5,"Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(3, "Third Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(6, "Final Score:");
    expect(logSpy).toHaveBeenNthCalledWith(
      7,
      [
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |X  |X  |X  |X  |X  |X  |X  |X  |X  |7 / 5|     |",
        "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          | 30| 60| 90|120|150|180|210|237|257|  272|     |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      ].join("\n")
    );
  })
  it("given there has been nine frames, and the player gets an open frame", async () => {
    mockreadlineAysnc.mockResolvedValueOnce("5");
    mockreadlineAysnc.mockResolvedValueOnce("2");
    const scorecard = new Scorecard()
    const frame1 = frame(10)
    frame1.isStrike.mockReturnValue(true)
    frame1.total.mockReturnValue(10)
    scorecard.frames = [frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1,frame1]
    scorecard.score = [30,60,90,120,150,180,210,230,240]
    const boardGenerator = new BoardGenerator()
    const userInterface = new UserInterface(mockreadlineAysnc, scorecard, boardGenerator);
    await userInterface.run();
    expect(logSpy).toHaveBeenNthCalledWith(1, "Frame 10:");
    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      [
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |X  |X  |X  |X  |X  |X  |X  |X  |X  |     |     |",
        "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          | 30| 60| 90|120|150|180|210|230|240|     |     |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      ].join("\n")
    );
    expect(logSpy).toHaveBeenNthCalledWith(3,"Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(1, "First Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(4,"Frame 10 - Possible Throw: 0,1,2,3,4,5");
    expect(mockreadlineAysnc).toHaveBeenNthCalledWith(2, "Second Throw: ");
    expect(logSpy).toHaveBeenNthCalledWith(5, "Final Score:");
    expect(logSpy).toHaveBeenNthCalledWith(
      6,
      [
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          |X  |X  |X  |X  |X  |X  |X  |X  |X  |5 2  |     |",
        "|  Player  +---+---+---+---+---+---+---+---+---+-----+-----+",
        "|          | 30| 60| 90|120|150|180|210|235|252|  259|     |",
        "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      ].join("\n")
    );
  })
});
    

