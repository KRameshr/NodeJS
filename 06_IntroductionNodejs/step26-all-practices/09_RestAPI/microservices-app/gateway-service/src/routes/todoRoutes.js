const express = require("express");
const router = express.Router();

const { createTodo, getTodos } = require("../services/todoService");

// CREATE
router.post("/todos", async (req, res) => {
  try {
    const data = await createTodo(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Gateway error (create)",
      error: err.message,
    });
  }
});

// GET
router.get("/todos", async (req, res) => {
  try {
    const data = await getTodos();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Gateway error (fetch)",
      error: err.message,
    });
  }
});

module.exports = router;
