const { getDB } = require("../config/db");
const { createTodo } = require("../models/todoModel");

exports.createTodo = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Title required" });
    }

    const db = getDB();
    const newTodo = createTodo(req.body);

    const result = await db.collection("todos").insertOne(newTodo);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const db = getDB();
    const todos = await db.collection("todos").find().toArray();

    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
