const Frame = require("./frame");

class UserInterface {
  constructor(func = readLineAsync, scorecard, boardGenerator) {
    this.readLineAsync = func;
    this.scorecard = scorecard
    this.boardGenerator = boardGenerator
    this.possibleThrow = [0,1,2,3,4,5,6,7,8,9,10]
  }

  async run() {
    // regular frame interface
    while (this.scorecard.score.length < 9) {
      let i = this.scorecard.score.length
      let throw1 = await this.firstThrowInterface(i)
      if (Number(throw1) === 10) {
        await this.strikeInterface(throw1)
      } else {
        await this.spareOrOpenFrameInterface(throw1, i)
      }
    }
    // final frame interface
    let throw1 = await this.firstThrowInterface(9)
    if (Number(throw1) === 10) {
      // if player gets a strike on their first throw
      await this.finalFrameStrikeInterface(throw1)
    } else {
      let throw2 = await this.secondThrowInterface(throw1, 9)
      if (Number(throw1) + Number(throw2) == 10) {
        // if a player gets a spare on their second throw
        await this.finalFrameSpareInterface(throw1, throw2)
      } else {
        // if a player gets an open frame the score card ends
        let frame = new Frame(Number(throw1), Number(throw2));
        this.scorecard.addFrame(frame);
      }
    }
    this.showFinalScore()
  }

  async firstThrowInterface(i) {
    console.clear()
    console.log(`Frame ${i + 1}:`);
    const max = this.scorecard.calculateMaxScore()
    console.log(this.boardGenerator.getBoard(this.scorecard.frames, this.scorecard.score, max));
    console.log(`Frame ${i + 1} - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10`);
    return await this.inputValidator("First Throw: ", this.possibleThrow);
  }

  async secondThrowInterface(throw1, i) {
    const possibleSecondThrow = this.possibleThrow.slice(0,11-Number(throw1))
    console.log(`Frame ${i + 1} - Possible Throw: ${possibleSecondThrow}`);
    return await this.inputValidator("Second Throw: ", possibleSecondThrow)
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
j
  async finalFrameStrikeInterface(throw1) {
    console.log(`Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10`);
    let throw2 = await this.inputValidator("Second Throw: ", this.possibleThrow)
    console.log(`Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10`);
    let throw3 = await this.inputValidator("Third Throw: ", this.possibleThrow)
    let frame = new Frame(Number(throw1), Number(throw2), Number(throw3));
    this.scorecard.addFrame(frame);
  }

  async finalFrameSpareInterface(throw1, throw2) {
    console.log(`Frame 10 - Possible Throw: 0,1,2,3,4,5,6,7,8,9,10`);
    let throw3 = await this.inputValidator("Third Throw: ", this.possibleThrow);
    let frame = new Frame(Number(throw1), Number(throw2), Number(throw3));
    this.scorecard.addFrame(frame);
  }

  async showFinalScore() {
    console.clear()
    this.scorecard.calculateScore();
    const max = this.scorecard.score[9]
    console.log(`Final Score:`);
    console.log(this.boardGenerator.getBoard(this.scorecard.frames, this.scorecard.score, max));
  }

  async inputValidator(prompt, list) {
    const stringList = list.map(String);
    let input;
    while (true) {
      input = await this.readLineAsync(prompt);
      if (stringList.includes(input)) {
        break;
      }
      console.log("Invalid throw, try again!");
    }
    return input;
    }
}

module.exports = UserInterface;
