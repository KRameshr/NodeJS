const express = require("express");

const app = express();

app.get("/", (req, res) => {
  //   res.end("Hello world");
  res.send("Hello world Home page");
});

app.get("/about", (req, res) => {
  //   res.end("Hello world");
  res.send("Hello world about page");
});

app.get("/contact", (req, res) => {
  //   res.end("Hello world");
  res.send("Hello world contact page");
});

app.use((req, res) => {
  res.send("404 Page Not Found");
});

app.listen(3000, "localhost", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("the port running at 3000");
  }
});
