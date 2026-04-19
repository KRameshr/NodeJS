const app = require("../../index");
const request = require("supertest");

describe("API Server", () => {
  it("GET/todos returns all todos", async () => {
    const repo = await request(app).get("/todos");
    expect(repo.statusCode).toBe(200);
    expect(repo.body.length).toBe(2);
  });
});
