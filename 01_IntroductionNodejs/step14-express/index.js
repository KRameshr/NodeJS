/// https oposite is exprss or meteor js
/// express (module) is a framework built on top of http module to simplify server creation and routing. It provides a more
/// user-friendly API for handling HTTP  (module) requests and responses, making it easier to build web applications.
///express is simple and minimalistic, while http is more low-level and requires more manual handling of requests and responses.

// file is contained some infornation
// project wil be contained  package.json file and index.js file
const express = require("express");

let app = express(); // express is a function that returns an instance of an Express application

app.get("/", function (req, res) {
  //   res.write("Hello World");
  //   res.end();
  //or

  res.send("Hello World end");
});

// app.put("/", function (req, res) {});
// app.post("/", function (req, res) {});
// app.patch("/", function (req, res) {});
// app.delete("/", function (req, res) {});

app.listen(3000, "localhost", (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("Server is running at http://localhost:3000");
  }
});
