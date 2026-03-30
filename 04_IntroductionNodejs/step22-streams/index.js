// const fs = require("node:fs");
// const http = require("node:http");

// const server = http.createServer();

// server.on("request", (req, res) => {
//   // 1. Start reading the file
//   fs.readFile("./index.html", "utf-8", (err, data) => {
//     if (err) {
//       // 2. Handle errors (like file not found)
//       res.statusCode = 404;
//       return res.end("File not found");
//     }

//     // 3. Send the file data only AFTER it's been read
//     res.setHeader("Content-Type", "text/html");
//     res.end(data);
//   });
// const src = fs.createWriteStream("./h")
//   src.pipe(res);
// });

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });

const fs = require("node:fs");
const http = require("node:http");

const server = http.createServer((req, res) => {
  // 1. Create a READ stream from your file
  // Make sure the file extension is correct (e.g., "./index.html")
  const src = fs.createReadStream("./index.html");

  // 2. Handle errors (e.g., file doesn't exist)
  src.on("error", (err) => {
    res.statusCode = 404;
    res.end("File not found");
  });

  // 3. Pipe the file data TO the response
  // Flow: File (Readable) -> Response (Writable)
  src.pipe(res);
});

server.listen(3000, () => {
  console.log("Server streaming at http://localhost:3000");
});
