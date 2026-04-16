const EventEmitter = require("events");
const mongoose = require("mongoose");
const connectionHandler = require("./handler");

const myEmitter = new EventEmitter();

// Connect to MongoDB (Local or Atlas)
mongoose
  .connect("mongodb://localhost:27017/myApp")
  .then(() => console.log("--- Connected to MongoDB ---"))
  .catch((err) => console.error("Database connection failed", err));

myEmitter.on("connect", connectionHandler);

// When a user connects, it now triggers a Database Save!
myEmitter.emit("connect", "Ramesh");
