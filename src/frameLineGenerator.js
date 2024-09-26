class FrameLineGenerator {
  constructor() {
    this.frame_line = [];
  }
  generate(frames) {
    for (let i = 0; i < 10; i++) {
      if (i === 9) {
        if (frames[i]) {
          this.finalFrame(frames[i]);
        } else {
          this.frame_line.push(" ", " ", " ");
        }
      } else if (frames[i]) {
        this.regularFrame(frames[i]);
      } else {
        this.frame_line.push(" ", " ");
      }
    }
    return this.frame_line;
  }

  finalFrame(frame) {
    if (frame.throw3 === 10) {
      frame.throw3 = "X";
    } 
    if (frame.isStrike()) {
      if (frame.throw2 === 10) {
        this.frame_line.push("X", "X", frame.throw3);
      } else {
        this.frame_line.push("X", frame.throw2, frame.throw3);
      }
    } else if (frame.isSpare()) {
      this.frame_line.push(frame.throw1, "/", frame.throw3);
    } else {
      this.frame_line.push(frame.throw1, frame.throw2, " ");
    }
  }

  regularFrame(frame) {
    if (frame.isStrike()) {
      this.frame_line.push("X", " ");
    } else if (frame.isSpare()) {
      this.frame_line.push(frame.throw1, "/");
    } else {
      this.frame_line.push(frame.throw1, frame.throw2);
    }
  }
}

module.exports = FrameLineGenerator;
