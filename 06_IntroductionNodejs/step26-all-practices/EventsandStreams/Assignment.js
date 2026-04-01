const EventEmitter = require("events");
const myEmitter = new EventEmitter();

const createhandler = require("./handler");

myEmitter.on("connect", createhandler);
console.log("--- Server is running and waiting for connections ---");

myEmitter.emit("connect", { name: "K Ramesh" });
myEmitter.emit("connect", { name: "Guest_User_01" });
