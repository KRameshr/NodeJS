const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "myproject";
const dbCollection = "users";

const main = async () => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected SuccessFull");

    const db = client.db(dbName);
    const collection = db.collection(dbCollection);
    const user_Data = [
      { name: "Ramesh", age: 20, salary: 80000 },
      { name: "Priya", age: 24, salary: 95000 },
      { name: "Suresh", age: 18, salary: 30000 },
      { name: "Anjali", age: 28, salary: 120000 },
      { name: "Ganesh", age: 19, salary: 45000 },
      { name: "Amit", age: 32, salary: 150000 },
      { name: "Sneha", age: 22, salary: 65000 },
      { name: "Vikram", age: 27, salary: 110000 },
      { name: "Kavita", age: 25, salary: 85000 },
      { name: "Rahul", age: 30, salary: 135000 },
      { name: "Meera", age: 21, salary: 72000 },
    ];

    const result = await collection.insertMany(user_Data);
    console.log(result.insertedCount + " documents inserted");
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

main();
