const {
  register,
  login,
  updatePassword,
} = require("../controllers/authControllers");

const express = require("express");
const routes = express.Router();

routes.post("/regist", register);
routes.post("/login", login);
routes.put("/update-password", updatePassword);
module.exports = routes;
