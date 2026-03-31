const express = require("express");
const routes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./db/connection");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
connectDB();
// Routes
app.use("/", routes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
