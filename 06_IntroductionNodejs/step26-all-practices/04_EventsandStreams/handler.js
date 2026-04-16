const mongoose = require("mongoose");

// Define a simple Schema for connection logs
const logSchema = new mongoose.Schema({
  username: String,
  loginTime: { type: Date, default: Date.now },
});

const ConnectionLog = mongoose.model("ConnectionLog", logSchema);

const connectionHandler = async (user) => {
  try {
    const newLog = new ConnectionLog({ username: user });
    await newLog.save();

    console.log(`[Database] ✅ Saved connection log for: ${user}`);
  } catch (err) {
    console.error("[Database] ❌ Error saving log:", err.message);
  }
};

module.exports = connectionHandler;
