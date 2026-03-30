// var http = require("http");
// var fs = require("node:fs");

// let server = http.createServer(function (req, res) {
//   // res.writeHead(200, { Author: "vijay " });
//   res.writeHead(200, { "Content-Type": "text/html" });
//   // res.write("<h1> Hello World </h1>");
//   res.write(fs.readFileSync("index.html", "utf-8"));
//   console.log("Request received for URL:", req.url);
//   res.end();
// });

// server.listen(3000, function (err) {
//   if (err) {
//     console.error("Error starting server:", err);
//   } else {
//     console.log("Server is listening on port 3000");
//   }
// });
var http = require("http");
var fs = require("fs");

let server = http.createServer(function (req, res) {
  console.log("Request received for URL:", req.url);

  let filePath = "";

  if (req.url === "/" || req.url === "/index.html") {
    filePath = "index.html";
  } else if (req.url === "/about.html") {
    filePath = "about.html";
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    return res.end("<h1>404 - Page Not Found</h1>");
  }

  // Async file read (non-blocking)
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      return res.end("<h1>500 - Server Error</h1>");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});


/// https oposite is exprss or meteor js
/// express is a framework built on top of http module to simplify server creation and routing. It provides a more 
/// user-friendly API for handling HTTP requests and responses, making it easier to build web applications.
///express is simple and minimalistic, while http is more low-level and requires more manual handling of requests and responses.
