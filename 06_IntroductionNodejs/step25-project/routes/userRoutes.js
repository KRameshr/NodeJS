const {
  sampleGetOne,
  samplepostOne,
  samplepostTwo,
} = require("../controllers/userControllers");
const express = require("express");
const routes = express.Router();

routes.get("/", sampleGetOne);
routes.get("/data", samplepostOne);
routes.post("/", samplepostTwo);

module.exports = routes;
