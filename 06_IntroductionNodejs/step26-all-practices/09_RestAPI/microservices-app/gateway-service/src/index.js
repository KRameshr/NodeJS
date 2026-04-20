require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Gateway running on port ${process.env.PORT}`);
});
