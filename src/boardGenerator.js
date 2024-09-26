const FrameLineGenerator = require('./frameLineGenerator')

class BoardGenerator {
  constructor() {
    this.name = "  Player  ";
  }

  getBoard(frames, score, max) {
    const frameLineGenerator = new FrameLineGenerator()
    const f = frameLineGenerator.generate(frames)
    const s = this.getScoreLine(score);
    return [
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      "|  Frame   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10  | Max |",
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
      `|          |${f[0]} ${f[1]}|${f[2]} ${f[3]}|${f[4]} ${f[5]}|${f[6]} ${f[7]}|${f[8]} ${f[9]}|${f[10]} ${f[11]}|${f[12]} ${f[13]}|${f[14]} ${f[15]}|${f[16]} ${f[17]}|${f[18]} ${f[19]} ${f[20]}|     |`,
      `|${this.name}+---+---+---+---+---+---+---+---+---+-----+-----+`,
      "|          |" + s.join("") + this.getMaxScore(max),
      "+----------+---+---+---+---+---+---+---+---+---+-----+-----+",
    ].join("\n");
  }

  getScoreLine(score) {
    const s = [];
    for (let i = 0; i < 10; i++) {
      if (i === 9) {
        if (typeof score[i] === "number") {
          s.push(` ${score[i].toString().padStart(3, " ")} |`);
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

  getMaxScore(max) {
    if (typeof max === "number") {
      return ` ${max.toString().padStart(3, " ")} |`
    } else {
      return "     |"
    }
  }
}

module.exports = BoardGenerator;
