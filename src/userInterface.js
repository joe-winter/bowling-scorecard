const readline = require("readline");
const Frame = require("./frame");

const readLineAsync = (prompt) => {
  const rl = readline.createInterface({
    input: process.stdin,
  });

  return new Promise((resolve) => {
    console.log(prompt);
    rl.prompt();
    rl.on("line", (line) => {
      rl.close();
      resolve(line);
    });
    rl.close()
  });
};

class UserInterface {
  constructor(func = readLineAsync, scorecard, boardGenerator) {
    this.readLineAsync = func;
    this.scorecard = scorecard
    this.boardGenerator = boardGenerator
  }

  async run() {
    while (this.scorecard.score.length < 9) {
      let i = this.scorecard.score.length
      let throw1 = await this.firstThrowInterface(i)
      if (Number(throw1) === 10) {
        await this.strikeInterface(throw1)
      } else {
        await this.spareOrOpenFrameInterface(throw1, i)
      }
    }
    let throw1 = await this.firstThrowInterface(9)
    if (Number(throw1) === 10) {
      await this.finalFrameStrikeInterface(throw1)
    } else {
      let throw2 = await this.secondThrowInterface(throw1, 9)
      if (Number(throw1) + Number(throw2) == 10) {
        await this.finalFrameSpareInterface(throw1, throw2)
      } else {
        let frame = new Frame(Number(throw1), Number(throw2));
        this.scorecard.addFrame(frame);
      }
    }
    this.showFinalScore()
  }

  async firstThrowInterface(i) {
    console.log(`Frame ${i + 1}:`);
    console.log(this.boardGenerator.getBoard(this.scorecard.frames, this.scorecard.score));
    console.log(`Frame ${i + 1} - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10`);
    return await this.readLineAsync("First Throw: ");
  }

  async secondThrowInterface(throw1, i) {
    console.log(`Frame ${i + 1} - Possible Throw: ${[0,1,2,3,4,5,6,7,8,9,10].slice(0,11-Number(throw1))}`);
    return await this.readLineAsync("Second Throw: ");
  }

  async strikeInterface(throw1) {
    let frame = new Frame(Number(throw1));
    this.scorecard.addFrame(frame);
    this.scorecard.calculateScore();
  }

  async spareOrOpenFrameInterface(throw1, i) {
    let throw2 = await this.secondThrowInterface(throw1, i)
    let frame = new Frame(Number(throw1), Number(throw2));
    this.scorecard.addFrame(frame);
    this.scorecard.calculateScore();
  }

  async finalFrameStrikeInterface(throw1) {
    console.log(`Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10`);
    let throw2 = await this.readLineAsync("Second Throw: ");
    console.log(`Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10`);
    let throw3 = await this.readLineAsync("Third Throw: ");
    let frame = new Frame(Number(throw1), Number(throw2), Number(throw3));
    this.scorecard.addFrame(frame);
  }

  async finalFrameSpareInterface(throw1, throw2) {
    console.log(`Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10`);
    let throw3 = await this.readLineAsync("Third Throw: ");
    let frame = new Frame(Number(throw1), Number(throw2), Number(throw3));
    this.scorecard.addFrame(frame);
  }

  async showFinalScore() {
    this.scorecard.calculateScore();
    console.log(`Final Score:`);
    console.log(this.boardGenerator.getBoard(this.scorecard.frames, this.scorecard.score));
  }
}

const Scorecard = require('./scorecard')
const BoardGenerator = require('./boardGenerator')
const scorecard = new Scorecard()
const boardGenerator = new BoardGenerator()
const ui = new UserInterface(readLineAsync, scorecard, boardGenerator);
ui.run();

module.exports = UserInterface;
