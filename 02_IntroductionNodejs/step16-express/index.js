const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("successfull");
  }
});

//template engins pug,ejs,handlebars,mustache
