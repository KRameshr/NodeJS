const express = require("express");
const ejs = require("ejs");
const pug = require("pug");

const PORT = process.env.PORT || 3000;
const app = express();

// ✅ Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ✅ CSP
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com",
  );
  next();
});

// ✅ Both engines
app.engine("ejs", ejs.renderFile);
app.engine("pug", pug.renderFile);
app.set("views", "./views");
app.set("view engine", "ejs");

// ✅ Storage
let storeDataContainer = [];

// GET / — show form
app.get("/", (req, res) => {
  res.render("home");
});

// POST /search — handle form → redirect to result
app.post("/search", (req, res) => {
  const { name, email, password, age, city, gender, skills, message } =
    req.body;

  // ✅ push data
  storeDataContainer.push({
    name,
    email,
    password,
    age,
    city,
    gender,
    skills,
    message,
  });

  console.log("Data →", storeDataContainer);

  // ✅ render result.ejs
  res.render("result", {
    person: storeDataContainer[storeDataContainer.length - 1],
    all: storeDataContainer,
  });
});

// ─── PUG ROUTES ──────────────────
app.get("/pug", (req, res) => {
  res.render("home.pug"); // home.pug
});

app.post("/pug-search", (req, res) => {
  const { name, email, password, age, city, gender, skills, message } =
    req.body;
  storeDataContainer.push({
    name,
    email,
    password,
    age,
    city,
    gender,
    skills,
    message,
  });
  console.log("Pug Data →", storeDataContainer);
  res.render("result.pug", {
    person: storeDataContainer[storeDataContainer.length - 1],
    all: storeDataContainer,
  });
});
// 404 — always last
app.use((req, res) => {
  res.status(404).render("notfound");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
