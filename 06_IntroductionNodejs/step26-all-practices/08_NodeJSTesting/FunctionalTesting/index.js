const express = require("express");
const path = require("path");

const app = express();

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "contact.html"));
});

app.get("/service", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "service.html"));
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
