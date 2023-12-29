const {
  getUsers,
  createUser,
  logInUser,
  changeUser,
  deleteUser,
} = require("./user.controller");
const express = require("express");
const userRoute = express.Router();

userRoute.get("/", getUsers);
userRoute.post("/newuser", createUser);
userRoute.get("/login/:id", logInUser);
userRoute.post("/:id", changeUser);
userRoute.delete("/:id", deleteUser);

module.exports = { userRoute };
