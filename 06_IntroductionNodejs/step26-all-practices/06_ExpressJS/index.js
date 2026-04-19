const express = require("express");
const { url } = require("inspector");
const path = require("path");

const app = express();

// set
app.set("view engin", "ejs");

//  middel ware
app.use(express.urlencoded({ extended: true }));

// routes

// static
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/form", (req, res) => {
  console.log("data is", req.body);
  res.send("data is send successfull");
});

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "ramesh", age: 20 });
});

app.get("/about", (req, res) => {
  // res.send("about");
  res.end("B");
});
app.use((req, res) => {
  res.send("not Found");
});

app.listen(8000, "localhost", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("SuccessFull");
  }
});
