var eventEmitter = require("events").EventEmitter;

var emitter = new eventEmitter(); //event emitter object

function greet() {
  console.log("Hello World");
}

emitter.addListener("greet", greet); //call back function
emitter.emit("greet"); //event dispatch

// Example: in (E-commerce)

// When a user places an order, multiple things should happen:

// Send confirmation email
// Update inventory
// Notify admin

var EventEmitter = require("events").EventEmitter;

var orderSystem = new EventEmitter();

// Listener 1 → Send Email
orderSystem.on("orderPlaced", function (orderId) {
  console.log(`Email sent for order ${orderId}`);
});

// Listener 2 → Update Inventory
orderSystem.on("orderPlaced", function (orderId) {
  console.log(`Inventory updated for order ${orderId}`);
});

// Listener 3 → Notify Admin
orderSystem.on("orderPlaced", function (orderId) {
  console.log(`Admin notified for order ${orderId}`);
});

// Emit Event (User places order)

setTimeout(() => {
  // async operation after 2 days
  orderSystem.emit("orderPlaced", 101);
}, 2 * 1000);

console.log("Out of stock will soon be updated");

let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Checking inventory... ${count}`);
  if (count === 5) {
    console.log("Inventory updated");
    clearInterval(intervalId);
  }
}, 2000);
