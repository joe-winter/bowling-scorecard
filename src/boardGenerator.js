const FrameLineGenerator = require('./frameLineGenerator')
const frameLineGenerator = new FrameLineGenerator()

class BoardGenerator {
  constructor() {
    this.name = "  Player  ";
  }

  getBoard(frames, score) {
    const frameLine = frameLineGenerator.generate(frames)
    const s = this.getScoreLine(score);
    return [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|          |" + frameLine + "     |",
      `|${this.name}+---+---+---+---+---+---+---+---+---+-----+-----+`,
      "|          |" + s.join("") + "     |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
  }

  getScoreLine(score) {
    const s = [];
    for (let i = 0; i < 10; i++) {
      if (i === 9) {
        if (typeof score[i] === "number") {
          s.push(`${score[i].toString().padStart(5, " ")}|`);
        } else {
          s.push("     |");
        }
      } else if (typeof score[i] === "number") {
        s.push(`${score[i].toString().padStart(3, " ")}|`);
      } else {
        s.push("   |");
      }
    }
    return s;
  }
  giveName(name) {
    if (name.length > 8) {
      this.name = " " + name.slice(0, 8) + " ";
    } else {
      const space = 10 - name.length;
      const after = Math.round(space / 2);
      const before = space - after;
      this.name = " ".repeat(before) + name + " ".repeat(after);
    }
  }
}

module.exports = BoardGenerator;
