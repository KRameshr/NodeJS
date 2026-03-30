var os = require("node:os");

console.log("Architecture: " + os.arch());
console.log("Platform: " + os.platform());
console.log("CPU: " + os.cpus().length);
console.log("Free Memory: " + os.freemem() / (1024 * 1024 * 1024));
console.log("Total Memory: " + os.totalmem() / (1024 * 1024 * 1024));
console.log(
  "used Memory: " + (os.totalmem() - os.freemem()) / (1024 * 1024 * 1024),
);
console.log("Os userInfo: ", os.userInfo());
console.log("Os username: ", os.userInfo().username);
