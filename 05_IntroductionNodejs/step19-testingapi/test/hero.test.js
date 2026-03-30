const request = require("supertest");
const { expect } = require("chai");
const app = require("../index"); // Main Express entry point
const Hero = require("../models/heroModel"); // Mongoose Model

/**
 * @description Integration Tests for Hero CRUD Operations
 * These tests verify the flow between API routes and the MongoDB database.
 */
describe("Hero CRUD API Integration Suite", function () {
  // Increase timeout for remote database handshakes (e.g., MongoDB Atlas)
  this.timeout(10000);
  let testHeroId;
  const uniqueTestEmail = `test_${Date.now()}@hero.com`;
  /**
   * CLEANUP HOOK
   * Ensures that temporary test data is removed after the suite runs.
   */
  after(async () => {
    try {
      await Hero.deleteMany({ email: { $regex: /@hero\.com$/ } });
    } catch (error) {
      console.error("Cleanup Error:", error);
    }
  });

  /**
   * @test CREATE Operation
   * Verifies that a hero can be saved to the database via POST request.
   */
  it("POST /save -> should persist a new hero to the database", async () => {
    const heroData = {
      title: "Full Stack Engineer",
      firstname: "Kuruba",
      lastname: "Ramesh",
      email: uniqueTestEmail,
      city: "Anantapur",
    };
    const response = await request(app).post("/save").send(heroData);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("_id");
    expect(response.body.firstname).to.equal("Kuruba");
    // Capture ID for downstream Update and Delete tests
    testHeroId = response.body._id;
  });

  /**
   * @test READ Operation
   * Verifies that all heroes can be retrieved and the new hero exists in the list.
   */
  it("GET /data -> should retrieve the complete hero list including the new entry", async () => {
    const response = await request(app).get("/data");

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");

    // Functional verification: find the specific email in the result set
    const isHeroInList = response.body.some(
      (hero) => hero.email === uniqueTestEmail,
    );
    expect(isHeroInList).to.be.true;
  });

  /**
   * @test UPDATE Operation
   * Verifies that existing data can be modified using a specific ID.
   */
  it("PUT /update/:id -> should successfully modify the city using a valid ObjectId", async () => {
    expect(testHeroId).to.not.be.undefined;

    const updatePayload = { city: "Hyderabad" };
    const response = await request(app)
      .put(`/update/${testHeroId}`)
      .send(updatePayload);

    expect(response.status).to.equal(200);
    expect(response.body.city).to.equal("Hyderabad");
  });

  /**
   * @test DELETE Operation (Cleanup of created data)
   * Verifies that the specific document is removed from the collection.
   */
  it("DELETE /delete/:id -> should remove the test hero and confirm deletion in DB", async () => {
    const response = await request(app).delete(`/delete/${testHeroId}`);

    expect(response.status).to.equal(200);

    // Deep verification: check the database directly
    const verifyInDb = await Hero.findById(testHeroId);
    expect(verifyInDb).to.be.null;
  });

  /**
   * @test TARGETED DELETE Operation
   * Demonstrates the ability to find and remove a pre-existing specific record.
   */
  it("DELETE /delete/:id (Targeted) -> should find 'Suresh' by name and delete the record", async () => {
    // Step 1: Query all data to find the target's unique ID
    const fetchResponse = await request(app).get("/data");
    const targetHero = fetchResponse.body.find(
      (hero) => hero.firstname === "Ramesh",
    );

    // Step 2: Ensure the target exists before attempting deletion
    expect(
      targetHero,
      "Suresh Patel must exist in the database for this test to pass",
    ).to.not.be.undefined;

    // Step 3: Execute deletion
    const deleteResponse = await request(app).delete(
      `/delete/${targetHero._id}`,
    );

    expect(deleteResponse.status).to.equal(200);
    console.log(
      `Successfully deleted pre-existing record: ${targetHero.firstname}`,
    );
  });
});

// "I implemented a professional MVC architecture to decouple database models, API routes, and UI logic, ensuring the codebase is scalable and follow industry standards."
// "I automated the testing lifecycle using Mocha, Chai, and Supertest, which allows for high-speed integration testing of RESTful endpoints without manually starting the server."
// "My test suite follows the AAA (Arrange-Act-Assert) pattern, verifying the full CRUD lifecycle from data persistence in MongoDB to proper HTTP status code responses."
// "I handled database constraints by using dynamic data generation for unique fields and implemented asynchronous hooks to sanitize the database after every test run."
// "By exporting the app instance for 'headless' testing, I ensured that my API logic is verified against real database interactions, proving the reliability of the entire back-end stack."
