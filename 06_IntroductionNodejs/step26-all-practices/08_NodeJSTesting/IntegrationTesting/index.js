const express = require("express");

const app = express();

const data = [
  {
    id: 1,
    text: "Todo #1",
    done: false,
  },
  { id: 2, text: "Todo #2", done: true },
];

app.get("/todos", (req, res) => {
  res.send(data);
});

module.exports = app;
