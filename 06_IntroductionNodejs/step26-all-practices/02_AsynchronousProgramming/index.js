//call back and call stack queue call queue call stack

function timer(callback, time) {
  setTimeout(callback, time);
}

timer(function () {
  console.log("Call back Function");
}, 1000);

// -------------------

const promise = new Promise((resolve, reject) => {
  let value = true;

  if (value) {
    resolve("Operation Successful!");
  } else {
    reject("Operation Failed!");
  }
});
promise
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("Process Finished"));

// -------------------

function settimercallBack(timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(timer);
    }, timer);
  });
}
settimercallBack(1000)
  .then((res) => console.log(`second one:  ${res}`))
  .catch((err) => console.log(err))
  .finally(() => console.log("Process second one Finished"));

// -------------------

async function sleep(time) {
  let result = await settimercallBack(time);
  console.log(`the timer is waiting ansy is ${result}`);
}
sleep(1000);
