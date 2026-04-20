const { getTodoById } = require("../index");

describe("Todo Persistance", () => {
  it("It gets a unique todo from db", () => {
    const repo = {
      findById: jest
        .fn()
        .mockReturnValueOnce({ id: 1, text: "Mock1", done: false })
        .mockReturnValueOnce({ id: 2, text: "Mock2", done: false }),
    };
    const r = getTodoById(repo, 1);
    expect(r.id).toBe(1);
    expect(r.text).toBe("Mock1");

    const result = getTodoById(repo, 2);
    expect(result.id).toBe(2);
    expect(result.text).toBe("Mock2");
  });

  it("throw new Error", () => {
    const repo = {
      findById: jest.fn().mockReturnValueOnce(null),
    };

    expect(() => getTodoById(repo, 1)).toThrow(
      "No todo with the given id found",
    );
  });
});
