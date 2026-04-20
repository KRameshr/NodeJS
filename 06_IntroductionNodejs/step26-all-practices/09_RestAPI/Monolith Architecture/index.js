const express = require("express");
const { greet } = require("./services/greeting-services");

const app = express();

app.get("/", (req, res) => {
  const name = req.query.name || "Guest";

  const message = greet(name);

  res.status(200).send(message);
});

app.listen(3000, () => console.log("running on 3000"));
