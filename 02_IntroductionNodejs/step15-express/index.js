//nodejs == deno.js , bun.js

// 💡 Real-world analogy
// Node.js = Java (enterprise standard)
// Deno = Modern redesigned version
// Bun = Fast & optimized new competitor

// 🚀 What should YOU use?
// Since you're working on MERN stack projects:

// 👉 Stick with:
// Node.js (for now, best for jobs + ecosystem)

// 👉 But explore:
// Bun → for performance experiments
// Deno → for learning modern runtime concepts

// 🧠 Final verdict
// Node.js is not replaced
// Deno & Bun are alternatives, not replacements
// Future = co-existence, not elimination
const express = require("express");
let config = require("./config.json");
let path = require("node:path");

const PORT = process.env.PORT || config.port;
const app = express();

// Middleware to parse JSON bodies in incoming requests. This allows us to access the data sent in the request body as a JavaScript object using req.body.

// app.use("/assets", express.static(path.join(__dirname, "assets"))); //it is forwarding the request to the images folder when the client requests for /assets. So, when the client requests for /assets/01-smallsize.png, it will look for the file in the images folder and serve it if found.
// app.use(express.static(__dirname)); // Serve static files (CSS, JS, images)
// app.use(express.json());
// Serve assets folder

// Serve images folder
//app.use("/images", express.static(path.join(__dirname, "images")));

//global middleware to serve static files from the current directory and it will be applied to all the routes in the application. So, when the client requests for any static file (CSS, JS, images) it will look for the file in the current directory and serve it if found.

app.use(function (req, res, next) {
  console.log("Middleware 1: Logging request method and URL");
  console.log("Request URL:", req.url);
  next(); // Call the next middleware or route handler
});

app.use(function (req, res, next) {
  //req , res, next is called steams for events are the parameters of the middleware function. req is the request object, res is the response object and next is a function that is used to call the next middleware or route handler in the stack.
  console.log("Middleware 2: Logging request method and URL");
  console.log("Request URL:", req.url);
  next(); // Call the next middleware or route handler
});

// local middleware for the root route  when it fire it will lode the logRequest function and then it will fire the route handler for the root route
function anythinghandler(req, res, next) {
  console.log("Local Middleware: Logging request method and URL");
  next(); // Call the next middleware or route handler
}

function onemoreanythinghandler(req, res, next) {
  // is called handler also when the route is fire it will lode the logRequesttwo function and then it will fire the route handler for the root route
  console.log("Local Middleware: Logging request method and URL");
  next(); // Call the next middleware or route handler
}

//  define a route for the root URL ("/") that sends an HTML file as a response. When a client makes a GET request to the root URL, the server will respond by sending the "index.html" file located in the current directory (__dirname). The sendFile method is used to send the file as a response to the client.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // sendFile is used to send an HTML file as a response. __dirname gives the current directory path, and we append "/index.html" to it to specify the file we want to send.
});

//  name route for the "/about" URL that uses two local middleware functions (logRequest and logRequesttwo) before sending a response. When a client makes a GET request to the "/about" URL, the server will first execute the logRequest middleware, then the logRequesttwo middleware, and finally send an HTML response with the content "<h1>About Us</h1>".
app.get("/about", anythinghandler, onemoreanythinghandler, (req, res) => {
  res.send("<h1>About Us</h1>");
});
// 404 handler for unmatched routes. This middleware will be executed if no other route matches the incoming request. It sends a 404 status code and a message "Route not found" as a response to the client.
app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// $env:PORT = 2020
// set PORT = 2020

///npm i in git only install
//  "devDependencies": {
//     "nodemon": "^3.1.14"
//   },

// not install
// "dependencies": {
//   "express": "^5.2.1"
// }
