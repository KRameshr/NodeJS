// Create a function that will work as a fake promise. The function should accept some data based on
// the duration, and it should return some specified data after the specified time is over in a promise.

// The requirements look like this:
// A fake promise needs to be a function.

// It should accept duration, as well as the expected data, as a parameter.

// It should return some specified data as a promise after the specified duration.

// The data should be in the .json format.

function fakePromise(duration, data) {
  return new Promise((resolve, reject) => {
    if (typeof duration !== "number" || duration < 0) {
      return reject({ error: "Invalid duration provided" });
    }

    // Set the timer
    setTimeout(() => {
      resolve(data);
    }, duration);
  });
}

const myData = {
  id: 1,
  name: "Kuruba Ramesh",
  status: "Success",
  message: "Data fetched from fake promise",
};

console.log("Starting the fake promise...");

fakePromise(3000, myData)
  .then((response) => {
    console.log("Received Data after 3 seconds:");
    // Convert object to JSON string for the final requirement look
    console.log(JSON.stringify(response, null, 1));
  })
  .catch((err) => {
    console.log("Error:", err);
  });
