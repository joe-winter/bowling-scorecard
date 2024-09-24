class Frame {
  constructor(throw1, throw2=0, throw3=0) {
    this.throw1 = throw1
    this.throw2 = throw2
    this.throw3 = throw3
  }

  isSpare() {
    return this.throw1 + this.throw2 === 10 && this.throw1 < 10;
  }

  isStrike() {
    return this.throw1 === 10;
  }

  total() {
    return this.throw1 + this.throw2 + this.throw3
  }
}

module.exports = Frame