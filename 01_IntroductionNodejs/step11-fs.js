var fs = require("node:fs");

// fs.writeFileSync("message.txt", "Hello World", { encoding: "utf-8" });

// fs.readFile("Readtextfile.txt", { encoding: "utf-8" }, function (err, data) {
//   if (err) {
//     console.error("Error reading file:", err);
//   } else {
//     console.log("File content:", data.toString());
//   }
// });

// fs.writeFile(
//   "messagefileTwo.txt",
//   "Hello World",
//   { encoding: "utf-8" },
//   function (err) {
//     if (err) {
//       console.error("Error writing file:", err);
//     } else {
//       console.log("File written successfully");
//     }
//   },
// );

// fs.readFile("messagefileTwo.txt", { encoding: "utf-8" }, function (err, data) {
//   if (err) {
//     console.error("Error reading file:", err);
//   } else {
//     console.log("File content:", data.toString());
//   }
// });

// fs.mkdirSync("newfolder");
// fs.writeFileSync(
//   "newfolder/newfile.txt",
//   "This is a new file inside the new folder.",
//   "utf-8",
// );
// console.log("File created successfully in the new folder.");

// fs.mkdirSync("newfolder");
// process.chdir("newfolder");
// fs.writeFileSync(
//   "newfile.txt",
//   "This is a new file inside the new folder.",
//   "utf-8",
// );
// console.log("File created successfully in the new folder.");

console.log("dirName: " + __dirname);
console.log("FileName: " + __filename);
console.log("Process : " + process.cwd());

// external  file Reading
