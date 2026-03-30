// var fetch = require("fetch");
// var fs = require("node:fs");
// fetch.fetchUrl(
//   "https://jsonplaceholder.typicode.com/todos/",
//   {},
//   function (error, meta, body) {
//     if (error) {
//       console.error("Error fetching data:", error);
//     } else {
//       // Write the fetched data to a file above url
//       fs.writeFileSync("fetchedData.txt", body.toString(), "utf-8");
//       console.log("Fetched data successfully");
//     }
//   },
// );

var farnumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// let promoise = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     if (true) {
//       resolve(farnumber);
//     } else {
//       reject("the was not suscessfully  executed");
//     }
//   }, 2000);
// });
// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.error(err);
// })
// .finally(() => {
//   console.log("the promise was executed");
// });
// .then((data) => {
//   console.log(data);
//   return data.filter((val) => {
//     //filter method is used to filter the data from the array and return the new array with the filtered
//     return val > 5;
//   });
// })
// .then((data) => {
//   console.log("sum :" + data);
//   return data.reduce((acc, val) => {
//     //reduce method is used to reduce the array to a single value by applying a function to each element of the array and returning the accumulated result
//     return acc + val;
//   });
// })
// .catch((err) => {
//   console.error(err);
// })
// .finally(() => {
//   console.log("the promise was executed");
// });

let promise1 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (true) {
        resolve("resolve the promise 1");
      } else {
        reject("the was not suscessfully  executed");
      }
    }, 1000);
  });
};

let promise2 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (true) {
        resolve("resolve the promise 2");
      } else {
        reject("the was not suscessfully  executed");
      }
    }, 3000);
  });
};

let promise3 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (true) {
        resolve("resolve the promise 3");
      } else {
        reject("the was not suscessfully  executed");
      }
    }, 4000);
  });
};
promise2().then().catch().finally();
promise2().then().catch().finally();
promise2().then().catch().finally();

Promise.all([promise1(), promise2(), promise3()])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log("all promises all were executed");
  });

Promise.any([promise1(), promise2(), promise3()])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log("all promises any were executed");
  });

Promise.race([promise1(), promise2(), promise3()])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log("all promises race were executed");
  });

Promise.allSettled([promise1(), promise2(), promise3()])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log("all promises allSettled were executed");
  });
