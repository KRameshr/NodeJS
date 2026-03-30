// const express = require("express");
// const http = require("http"); // Required for Socket.io
// const { Server } = require("socket.io"); // Socket server class
// const connectDB = require("./db/connection");
// const morgan = require("morgan");
// const path = require("path");

// const PORT = process.env.PORT || 3000;
// const app = express();

// /**
//  * 1. WRAP EXPRESS WITH HTTP SERVER
//  * This allows both standard HTTP and WebSocket traffic on the same port.
//  */
// const server = http.createServer(app);
// const io = new Server(server); // Initialize Socket.io on the server

// // Database Connection
// connectDB();

// // Middlewares
// app.set("view engine", "pug");
// app.use(express.static(path.join(__dirname, "views")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan("tiny"));

// /**
//  * 2. SOCKET.IO CONNECTION HANDLER
//  * This manages the "persistent, bi-directional" connection.
//  */
// io.on("connection", (socket) => {
//   console.log(`📡 New Client Connected: ${socket.id}`);

//   socket.on("disconnect", () => {
//     console.log("❌ Client Disconnected");
//   });
// });

// /**
//  * 3. ATTACH IO TO REQUEST OBJECT
//  * This allows your Routes (heroRoutes.js) to access 'io'
//  * and "push" updates when a Hero is saved or deleted.
//  */
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // Routes
// app.use("/", require("./routes/heroRoutes"));

// /**
//  * 4. START SERVER
//  * We listen using 'server.listen' instead of 'app.listen'
//  */
// if (require.main === module) {
//   server.listen(PORT, (err) => {
//     if (err) console.log("Error:", err);
//     else console.log(`🚀 Real-time Server running at http://localhost:${PORT}`);
//   });
// }

// // Export both app and server for testing/external use
// module.exports = app;

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db/connection");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const io = new Server(server);

connectDB();

// --- MIDDLEWARES ---
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

/**
 * 1. CORRECT STATIC PATH
 * Your screenshot shows index.html is in 'public', not 'views'.
 */
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// 2. ATTACH IO TO REQUEST
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log(`📡 New Client Connected: ${socket.id}`);
  socket.on("disconnect", () => console.log("❌ Client Disconnected"));
});

/**
 * 3. CORRECT ROUTE FOR INDEX.HTML
 * Point this to the 'public' folder.
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 4. ROUTES
app.use("/", require("./routes/heroRoutes"));

if (require.main === module) {
  server.listen(PORT, (err) => {
    if (err) console.log("Error:", err);
    else console.log(`🚀 Real-time Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
