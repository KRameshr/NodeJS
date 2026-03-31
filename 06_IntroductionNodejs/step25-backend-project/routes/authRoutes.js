const {
  register,
  login,
  updatePassword,
} = require("../controllers/authControllers");

const auth = require("../middlewares/authMiddleware");

const express = require("express");
const routes = express.Router();

routes.post("/regist", register);
routes.post("/login", login);
routes.put("/update-password", auth, updatePassword);
module.exports = routes;
