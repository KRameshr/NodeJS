const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const ejs = require("ejs");
const pug = require("pug");

// ✅ This one line loads ALL static files (CSS, JS, images)
app.use(express.static("public"));
// Parse form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ✅ Register BOTH engines
app.engine("ejs", ejs.renderFile); // .ejs files
app.engine("pug", pug.renderFile); // .pug files

// ✅ Default engine
app.set("view engine", "ejs");
app.set("views", "./views");

//This is called a Route Handler
app.get("/", (req, res) => {
  res.render("index"); // no need to write .ejs
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  //↑   ↑           ↑           ↑
  //app HTTPMethod, GET Route   Callback Function

  res.render("contact");
  //    ↑      ↑
  //  response  render method
});

// app
// Express application instance
// created by → const app = express()

// .get
// HTTP Method
// GET = user visits URL in browser

// ("/contact")
// Route Path
// URL user types → localhost:3000/contact

// (req, res) => { }
// Callback Function / Route Handler
// runs when user visits /contact

// req
// request object
// contains data FROM user
// req.params, req.query, req.body

// res
// response object
// sends data BACK to user
// res.render, res.send, res.json

// res.render("contact")
// render method
// loads views/contact.ejs and sends HTML to browser

//All Response Methods
// Render EJS template
// 1. res.render("contact");

// Send plain text
//2.res.send("Hello World");

// Send JSON data
//3.res.json({ name: "Ramesh" });

// Redirect to another page
//4.res.redirect("/home");

// Send status code
// 5.res.status(404).render("notfound");

// Handle contact form submit
let message = "© 2026 NovaSpark. All rights reserved.";

// Blog data
const posts = [
  {
    id: 1,
    slug: "learn-nodejs",
    title: "How to Learn Node.js",
    category: "Backend",
    date: "March 10, 2026",
    author: "Ramesh",
    read: "5 min",
    content:
      "Node.js is a JavaScript runtime built on Chrome V8 engine. Start with basics like modules, npm, and then move to Express framework.",
  },
  {
    id: 2,
    slug: "react-vs-vue",
    title: "React vs Vue in 2026",
    category: "Frontend",
    date: "March 12, 2026",
    author: "Suresh",
    read: "4 min",
    content:
      "Both React and Vue are excellent frontend frameworks. React has a larger ecosystem while Vue is easier to learn.",
  },
  {
    id: 3,
    slug: "mongodb-guide",
    title: "MongoDB Complete Guide",
    category: "Database",
    date: "March 14, 2026",
    author: "Mahesh",
    read: "8 min",
    content:
      "MongoDB is a NoSQL database that stores data in JSON-like documents. Perfect for Node.js applications.",
  },
  {
    id: 4,
    slug: "ejs-vs-pug",
    title: "EJS vs Pug — Which One?",
    category: "Backend",
    date: "March 16, 2026",
    author: "Ramesh",
    read: "3 min",
    content:
      "EJS uses HTML syntax with embedded JavaScript. Pug uses indentation-based syntax with no closing tags.",
  },
  {
    id: 5,
    slug: "css-tips-2026",
    title: "CSS Tips for 2026",
    category: "Frontend",
    date: "March 18, 2026",
    author: "Rajesh",
    read: "6 min",
    content:
      "Modern CSS has evolved a lot. Use CSS Grid and Flexbox for layouts. CSS variables make theming easy.",
  },
  {
    id: 6,
    slug: "express-routing",
    title: "Express Routing Deep Dive",
    category: "Backend",
    date: "March 20, 2026",
    author: "Suresh",
    read: "7 min",
    content:
      "Express routing is the backbone of any Node.js app. Learn params, query strings, and middleware.",
  },
];

app.post("/contact", (req, res) => {
  const { name, email, subject, type, message } = req.body;
  console.log("New message from:", name, email);
  // Save to DB or send email here
  res.render("contact"); // or redirect with success message
});

// ✅ Features — no params (plain /features)
app.get("/features", (req, res) => {
  console.log(req.query); // query string if any
  res.render("features", {
    time: req.query.sort || "Nova", // from ?sort=latest
    cat: req.query.limit || "Spark", // from ?limit=10
    massage: message,
  });
});

// ✅ STATIC — "build" is FIXED word, not a variable
app.get("/features/build", (req, res) => {
  res.render("features", {
    time: "Nova",
    cat: "Spark",
    massage: message,
  });
});

// ✅ DYNAMIC — :timeline is a VARIABLE
//:timeline
// The : means it's a URL parameter — a variable part of the URL.

// 1 Features — one param
app.get("/features/:timeline", (req, res) => {
  res.render("features", {
    time: req.params.timeline || "Nova",
    cat: "Spark",
    massage: message,
  });
});

// javascript{ time: req.params.timeline }
//              ↑          ↑
//             EJS name   value from URL
//  Use in EJS file
// html<!-- features.ejs -->

// <h1>Timeline: <%= time %></h1>
// <!-- http://localhost:3000/featres/2026 -->
// <!-- Output: Timeline: 2026 -->

// 2 Features — two params
app.get("/features/:timeline/:category", (req, res) => {
  res.render("features", {
    time: req.params.timeline || "Nova",
    cat: req.params.category || "Spark",
    massage: message,
  });
});

// ─── PUG ROUTES ──────────────────────────────
app.get("/blog", (req, res) => {
  let filtered = posts;

  if (req.query.category) {
    filtered = posts.filter((p) => p.category === req.query.category);
  }

  res.render("blog.pug", {
    // ✅ .pug extension
    posts: filtered,
    total: filtered.length,
    category: req.query.category || "all",
  });
});

app.get("/blog/:slug", (req, res) => {
  const post = posts.find((p) => p.slug === req.params.slug);

  if (!post) return res.status(404).render("notfound");

  res.render("blog-detail.pug", {
    // ✅ .pug extension
    post: post,
    posts: posts,
  });
});

// ✅ Always put this at the BOTTOM of all routes
app.use((req, res) => {
  res.status(404).render("notfound");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

///interpoliaion  means send value form sever form client is modifiying is called is  interpoliaion
