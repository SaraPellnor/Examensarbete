const {
  getUsers,
  createUser,
  getUseryById,
  changeUser,
  deleteUser,
} = require("./user.controller");
const express = require("express");
const userRoute = express.Router();

userRoute.get("/", getUsers);
userRoute.post("/", createUser);
userRoute.get("/:id", getUseryById);
userRoute.post("/:id", changeUser);
userRoute.delete("/:id", deleteUser);

module.exports = { userRoute };
