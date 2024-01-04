// ---- Import user controller functions and Joi schema from respective modules

const {
  getUsers,
  getUserById,
  createUser,
  logInUser,
  logOutUser,
  changeUser,
  deleteUser,
  isUserLoggedIn,
} = require("./user.controller");
const {auth} = require("../middlewares")

const { userJoiSchema } = require("./user.model");



// ---- Import validation middleware for use when needed

const { validation } = require("../middlewares");
const express = require("express");



// ---- Create an Express Router for user routes

const userRoute = express.Router();



// ---- Assign different HTTP methods to respective controller functions

userRoute.get("/", getUsers); 
userRoute.get("/:id", getUserById);
userRoute.post("/auth", isUserLoggedIn);
userRoute.post("/create", validation(userJoiSchema), createUser); 
userRoute.post("/login", logInUser); 
userRoute.post("/logout", logOutUser);
userRoute.post("/update/:id", validation(userJoiSchema), changeUser);
userRoute.delete("/delete:id", deleteUser); 



// ---- Export the user router for use in other parts of the application

module.exports = { userRoute };
