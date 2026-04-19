const makeGreeter = require("../index");

describe("Greeter Module", () => {
  it("It gives correct greetings", () => {
    const expected = "Hello,Ram";
    const greeter = makeGreeter("Hello");
    const actual = greeter("Ram");
    expect(actual).toEqual(expected);
  });
});
