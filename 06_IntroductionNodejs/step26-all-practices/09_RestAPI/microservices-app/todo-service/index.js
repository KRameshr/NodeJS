require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const todoRoutes = require("./src/routes/todoRoutes");

const app = express();
app.use(express.json());

app.use("/", todoRoutes);

connectDB().then(() => {
  app.listen(5000, () => console.log("Todo Service running on port 5000"));
});
