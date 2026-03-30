const express = require("express");
const connectDB = require("./db/connection");
var morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // this allow to browser to permission for all the https method or other one is cors
//   next();
// });
app.set("view engine", "pug");
//app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));
//  middlewares Middleware runs between the request and your route handler.
app.use(express.json());
app.use(morgan("tiny"));

app.use(express.json()); // Reads JSON data from request body
app.use(express.urlencoded({ extended: true })); // Reads HTML Form data from request body
//app.use(express.static(__dirname + "/public")); // this will load in public/index.html means only load rest(public/default.html) will not load
//          or
//app.use(express.static("public")); // this will load in public/index.html means only load rest(public/default.html) will not load
//app.use(express.static("public", { index: "default.html" })); // this will load in public/filename.html means  public/default.html

// Database Connection

connectDB();

// Routes

app.use("/", require("./routes/heroRoutes"));

// Start  web Server
// app.listen(PORT, (err) => {
//   if (err) {
//     console.log("Error:", err);
//   } else {
//     console.log("localhost is Running at " + PORT);
//   }
// });

if (require.main === module) {
  app.listen(PORT, (err) => {
    if (err) console.log("Error:", err);
    else console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

// --- EXPORT FOR TESTING ---
module.exports = app;
