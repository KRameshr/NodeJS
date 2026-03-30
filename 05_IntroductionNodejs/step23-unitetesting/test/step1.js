// step1.test.js
const { expect } = require("chai");
const idx = require("../step1");

describe("User Profile Tests", () => {
  let app;

  // hooks run outside the arrow function context for better clarity
  before(() => {
    // Initializing the module/app instance
    app = idx;
  });

  after(() => {
    // Cleanup to prevent memory leaks
    app = null;
  });

  it("should check user is exist", () => {
    // Chai's 'equal' is great for string comparison
    expect(app.user).to.be.not.undefined;
  });

  it("should verify the username is 'Ramesh'", () => {
    // Chai's 'equal' is great for string comparison
    expect(app.user).to.equal("Ramesh");
  });

  //   it("should ensure the username length is exactly 5 characters", () => {
  //     // We can chain 'have.lengthOf' for more readable assertions
  //     expect(app.user).to.have.lengthOf(6);

  //     // Or the property-based approach:
  //     expect(app.user.length).to.equal(5);
  //   });

  it("should ensure the username length is exactly 5 characters", () => {
    // .trim() removes any leading or trailing spaces
    const cleanLength = app.user.trim().length;
    expect(cleanLength).to.equal(6);
  });
});
