const Frame = require("../src/frame");

describe("frames", () => {
  it("should save throw values when frame is created", () => {
    const frame = new Frame(3, 4);
    expect(frame.throw1).toBe(3);
    expect(frame.throw2).toBe(4);
    expect(frame.throw3).toBe(0);
  });
  it("should save 3 throw values when frame is created with 3", () => {
    const frame = new Frame(3, 7, 7);
    expect(frame.throw1).toBe(3);
    expect(frame.throw2).toBe(7);
    expect(frame.throw3).toBe(7);
  });
  it("should save 1 throw values when frame is created with 1", () => {
    const frame = new Frame(10);
    expect(frame.throw1).toBe(10);
    expect(frame.throw2).toBe(0);
    expect(frame.throw3).toBe(0);
  });
  it("should return true if the frame is an open frame", () => {
    const frame = new Frame(3, 4);
    expect(frame.isSpare()).toBe(false);
    expect(frame.isStrike()).toBe(false);
  });
  it("should return true if the frame is a spare", () => {
    const frame = new Frame(3, 7);
    expect(frame.isSpare()).toBe(true);
    expect(frame.isStrike()).toBe(false);
  });
  it("should return true if the frame is a strike", () => {
    const frame = new Frame(10);
    expect(frame.isSpare()).toBe(false);
    expect(frame.isStrike()).toBe(true);
  });
  it("total should return 7 if frame is (3,4)", () => {
    const frame = new Frame(3, 4);
    expect(frame.total()).toBe(7);
  });
  it("total should return 7 if frame is (10,10,10)", () => {
    const frame = new Frame(10, 10, 10);
    expect(frame.total()).toBe(30);
  });
});
