const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.method === "POST") {
      let body = "";

      // Data comes in chunks (streams)
      req.on("data", (data) => {
        body += data.toString();
      });

      req.on("end", () => {
        console.log("Received POST data:", body);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Data received");
      });
    } else {
      // Use fs.readFile (Asynchronous) for better performance
      fs.readFile("./index.html", (error, data) => {
        if (error) {
          res.writeHead(404);
          res.end("File not found");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    }
  })
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
