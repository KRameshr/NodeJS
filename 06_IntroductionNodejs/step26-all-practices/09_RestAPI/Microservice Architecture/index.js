const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", async (req, res) => {
  try {
    const name = req.query.name || "Guest";

    const response = await axios.get("http://localhost:8001", {
      params: { name },
    });

    console.log(response.data);

    res.status(200).send(response.data);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Service unavailable");
  }
});

app.listen(3000, () => console.log("Gateway running on 3000"));
