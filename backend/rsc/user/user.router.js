const {
  getUsers,
  getUserById,
  createUser,
  logInUser,
  logOutUser,
  auth,
  changeUser,
  deleteUser,
} = require("./user.controller");
const { joiSchema } = require("./user.model");
const { validation } = require("../middlewares");
const express = require("express");
const userRoute = express.Router();

userRoute.get("/", getUsers);
userRoute.get("/:id", getUserById);
userRoute.post("/auth", auth);
userRoute.post("/newuser", validation(joiSchema), createUser);
userRoute.post("/login", logInUser);
userRoute.post("/logout", logOutUser);
userRoute.post("/:id", changeUser);
userRoute.delete("/:id", deleteUser);

module.exports = { userRoute };
