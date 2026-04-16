const EventEmitter = require("events");
const myEmitter = new EventEmitter();
const fs = require("fs");

const functionOne = (data) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(
    `[${timestamp}] 🛠️  Formatter: Converting "${data.msg}" to uppercase... and name ${data.usename}`,
  );
  data.formattedMsg = data.msg.toUpperCase();
  data.userName = data.usename.toUpperCase();
};

const functionTwo = (data) => {
  console.log(`[Security]: Checking user permissions for ID: ${data.userId}`);
  if (data.userId < 100) {
    console.log("✅ Access Granted: Administrator Level.");
  } else {
    console.log("⚠️ Access Warning: Standard User Level.");
  }
};

const functionThree = (data) => {
  console.log(
    `[Database]: 💾 Saving entry... "${data.formattedMsg}" .... ${data.userName}`,
  );
  console.log("-----------------------------------------");
};

myEmitter.on("test", functionOne);
myEmitter.on("test", functionTwo);
myEmitter.on("test", functionThree);

console.log("Before Emit");
myEmitter.emit("test", {
  msg: "backup successful",
  userId: 45,
  usename: "k.ramesh",
});
console.log("After Emit");

console.log(
  "<--------------------------------------------------------------------->",
);

const stream = fs.createReadStream("index.html");

stream.on("data", (data) => {
  console.log(data.toString());
});

const reader = fs.createReadStream("sample.html", "utf8");
const streamWrite = fs.createWriteStream("index.html");

reader.on("data", (chunk) => {
  console.log("Reading chunk from sample.txt...");
  streamWrite.write(chunk);
});

streamWrite.on("drain", () => {
  console.log("✅ Buffer drained. Resuming reader..."); //data means will drain wll come
  reader.resume();
});
reader.on("end", () => {
  console.log("--- Finished Reading index.html ---");
  streamWrite.end();
});

streamWrite.on("finish", () => {
  console.log(" All data successfully written to index.html!");
});

reader.on("error", (err) => {
  console.error("Error: Could not find index.html!");
});
