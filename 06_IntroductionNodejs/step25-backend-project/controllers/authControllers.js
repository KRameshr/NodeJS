const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();

    // Create token after saving
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      message: "User registered!",
      user: { username: user.username }, // ✅ Never send password back
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Corrected bcrypt.compare
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token only after successful password check
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: { username: user.username },
      token, // ✅ Send the token so the frontend can stay logged in
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Use the ID attached by the 'auth' middleware
    const userId = req.user._id;

    // Find user by ID and include password for comparison
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    // Update and save (triggers your hashing .pre("save") hook)
    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated securely! ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, updatePassword };
