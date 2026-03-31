/// call back error

function mutiplyEvenNumber(x, y, callback) {
  if (x % 2 != 0 || y % 2 != 0)
    setTimeout(() => {
      callback("Odd Numbers");
    }, 2000);
  else
    setTimeout(() => {
      callback(null, x * y);
    }, 2000);
}

mutiplyEvenNumber(8, 4, (err, result) => {
  if (err != null) console.log(err);
  else console.log(result);
});

//--------------------------------------------------
function mutiplyPromiseEvenNumber(x, y) {
  return new Promise((resolve, reject) => {
    // Check if either number is odd
    if (x % 2 !== 0 || y % 2 !== 0) {
      setTimeout(() => {
        reject("Error: One or both numbers are Odd");
      }, 2000);
    } else {
      setTimeout(() => {
        resolve(x * y);
      }, 2000);
    }
  });
}

// --- Method 1: Using async/await (Recommended) ---
async function multply(x, y) {
  console.log("Async function started...");
  try {
    let result = await mutiplyPromiseEvenNumber(x, y);
    console.log("Async Result:", result);
  } catch (err) {
    console.log("Async Caught Error:", err);
  } finally {
    console.log("Async process finished.");
  }
}

// Call it with pure numbers
multply(8, 4);

// --- Method 2: Using .then()/.catch() ---
mutiplyPromiseEvenNumber(8, 4)
  .then((res) => console.log("Promise Result:", res))
  .catch((err) => console.log("Promise Error:", err))
  .finally(() => console.log("Promise process finished."));
