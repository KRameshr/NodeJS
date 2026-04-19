const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
// database setup

const url = "mongodb://127.0.0.1:27017";
const dbName = "myproject";
const dbColletion = "todos";
let collection;

const dbconnect = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Data base is connected");
    const db = client.db(dbName);
    collection = db.collection(dbColletion);
  } catch (err) {
    console.error(err);
  }
};

//routes
// insert one

app.post("/todos", async (req, res) => {
  try {
    const result = await collection.insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//all the records

app.get("/todos", async (req, res) => {
  try {
    const result = await collection.find().toArray();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get single one
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await collection.findOne({
      _id: new ObjectId(id),
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// update

app.put("/todos/:id", async (req, res) => {
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});
// start server

const startServer = async () => {
  await dbconnect();
  app.listen(3000, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Server running on port 3000");
  });
};
startServer();
