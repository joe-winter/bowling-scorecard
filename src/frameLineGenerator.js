class FrameLineGenerator {
  generate(frames) {
    const frame_line = [];
    for (let i = 0; i < 10; i++) {
      if (i === 9) {
        if (frames[i]) {
          frame_line.push(this.finalFrame(frames[i]));
        } else {
          frame_line.push("     |");
        }
      } else if (frames[i]) {
        frame_line.push(this.regularFrame(frames[i]))
      } else {
        frame_line.push("   |");
      }
    }
    return frame_line.join("");
  }

  finalFrame(frame) {
    if (frame.throw3 === 10) {
      frame.throw3 = "X";
    }
    if (frame.isStrike()) {
      if (frame.throw2 === 10) {
        return `X X ${frame.throw3}|`;
      }
      return `X ${frame.throw2} ${frame.throw3}|`;
    }
    if (frame.isSpare()) {
      return `${frame.throw1} / ${frame.throw3}|`;
    }
    return `${frame.throw1} ${frame.throw2}  |`;
  }

  regularFrame(frame) {
    if (frame.isStrike()) {
      return "X  |";
    } else if (frame.isSpare()) {
      return `${frame.throw1} /|`
    }
    else {
      return `${frame.throw1} ${frame.throw2}|`;
    }
  }
}

module.exports = FrameLineGenerator;
