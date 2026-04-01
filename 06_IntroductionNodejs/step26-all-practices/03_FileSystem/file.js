// console.log("current path of dir  " + __dirname);
// console.log("current path of file  " + __filename);
const fs = require("fs");

const data = fs.readFileSync("sample.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Could not find the file!");
    return;
  } else {
    console.error(data);
  }
});
const result = data.toString();
console.log(result);

console.log("--- Starting File Operations ---");

// 1. Read the file content
fs.readFile("sample.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file: Could not find 'sample.txt'");
  } else {
    console.log("File Content:\n" + data);
  }

  // 2. Nesting the stat check to ensure it happens after the read attempt
  fs.stat("check", (err, stats) => {
    if (err) {
      console.error("Error checking 'check': Path does not exist");
      return;
    }

    if (stats.isDirectory()) {
      console.log("Result: 'check' is a Directory");
    } else if (stats.isFile()) {
      console.log("Result: 'check' is a File");
    }
  });
  fs.stat("sample.txt", (err, stats) => {
    if (err) {
      console.error("Error checking 'check': Path does not exist");
      return;
    }

    if (stats.isDirectory()) {
      console.log("Result: 'sample.txt' is a Directory");
    } else if (stats.isFile()) {
      console.log("Result: 'sample.txt' is a File");
    }
  });

  fs.watchFile("sample.txt", (current) => {
    console.log(`Chnage at : ` + current.atime);
  });

  fs.watch("check", (event, data) => {
    console.log(`${event} : ${data} `);
  });
});

console.log("--- Request Sent (Waiting for Disk) ---");
