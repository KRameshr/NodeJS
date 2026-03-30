const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Import added for password hashing
const config = require("./config.json");
const app = express();
const PORT = 3000;

// --- 1. SETTINGS & ENGINE ---
app.set("view engine", "pug");
app.set("views", "./views");

// --- 2. MIDDLEWARE ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    name: "fullstack_Dev",
    secret: "zonetocode_secret_key",
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 30 * 60 * 1000, // Set to 30 mins for better usability
      secure: false,
      httpOnly: true,
    },
  }),
);

// --- 3. DATABASE CONNECTION ---
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String, // Stores the hashed version
});
const User = mongoose.model("User", userSchema);

const connectDB = async () => {
  let dbString =
    "mongodb+srv://{{uname}}:{{upassword}}@cluster0.{{dbstring}}.mongodb.net/{{dbname}}?appName=Cluster0";
  dbString = dbString
    .replace("{{uname}}", config.dbUsername)
    .replace("{{upassword}}", config.dbPassword)
    .replace("{{dbstring}}", config.dbString)
    .replace("{{dbname}}", config.dbName);

  try {
    await mongoose.connect(dbString);
    console.log("DB Connected ✅");
  } catch (err) {
    console.error("DB Connection Error ❌:", err.message);
  }
};
connectDB();

// --- 4. ROUTES ---

// Home
app.get("/", (req, res) => {
  res.render("index", { title: "Home", user: req.session.user || null });
});

// Register (GET)
app.get("/register", (req, res) => {
  res.render("register", { title: "Register", error: null, success: null });
});

// Register (POST) - Single consolidated route
app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render("register", {
      title: "Register",
      error: "Passwords do not match!",
      success: null,
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.render("register", {
      title: "Register",
      error: null,
      success: "Registration successful! Please login.",
    });
  } catch (err) {
    res.render("register", {
      title: "Register",
      error: "Email already exists!",
      success: null,
    });
  }
});

// Login (GET)
app.get("/login", (req, res) => {
  res.render("login", { title: "Login", error: null });
});

// Login (POST)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const isMatch = await bcrypt.compare(password, foundUser.password); // Compare hash
      if (isMatch) {
        req.session.user = foundUser;
        return res.redirect("/dashboard");
      }
    }
    res.render("login", {
      title: "Login",
      error: "Invalid email or password!",
    });
  } catch (err) {
    res.render("login", { title: "Login", error: "Database error occurred." });
  }
});

// Dashboard (Protected)
app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("dashboard", { title: "User Dashboard", user: req.session.user });
});

// Profile (Protected)
app.get("/profile", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("profile", { title: "My Profile", user: req.session.user });
});

// Profile Update (AJAX)
app.post("/update-profile", async (req, res) => {
  try {
    const { firstname, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.session.user._id,
      { firstname, email },
      { new: true },
    );
    req.session.user = updatedUser;
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Change Password
app.post("/change-password", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.session.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.render("profile", {
        title: "Profile",
        user: req.session.user,
        error: "Current password wrong!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    req.session.destroy(() => {
      res.clearCookie("fullstack_Dev"); // Matches session name
      res.redirect("/login?success=Password updated.");
    });
  } catch (err) {
    res.render("profile", {
      title: "Profile",
      user: req.session.user,
      error: "Error occurred.",
    });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/dashboard");
    res.clearCookie("connect.sid");
    // This looks for a file named "logout.pug" in your views folder
    res.render("logout");
  });
});

// POST Login with Bcrypt
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const foundUser = await User.findOne({ email: email });

    if (foundUser) {
      // 2. Compare the plain-text password with the stored hash
      const isMatch = await bcrypt.compare(password, foundUser.password);

      if (isMatch) {
        // 3. If it matches, set the session and redirect
        req.session.user = foundUser;
        return res.redirect("/dashboard");
      }
    }

    // 4. If user not found or password doesn't match
    res.render("login", {
      title: "Login",
      error: "Invalid email or password!",
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.render("login", { title: "Login", error: "Database error occurred." });
  }
});
// --- 5. START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server Running at http://localhost:${PORT}`);
});
