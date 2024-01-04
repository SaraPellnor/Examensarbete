// ---- Import user controller functions and Joi schema from respective modules

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
const { userJoiSchema } = require("./user.model");



// ---- Import validation middleware for use when needed

const { validation } = require("../middlewares");
const express = require("express");



// ---- Create an Express Router for user routes

const userRoute = express.Router();



// ---- Assign different HTTP methods to respective controller functions

userRoute.get("/", getUsers); // Route to get all users
userRoute.get("/:id", getUserById); // Route to get a user by ID
userRoute.post("/auth", auth); // Route for user authentication
userRoute.post("/newuser", validation(userJoiSchema), createUser); // Use validation middleware to validate incoming data before creating a new user
userRoute.post("/login", logInUser); // Route for user login
userRoute.post("/logout", logOutUser); // Route for user logout
userRoute.post("/update/:id", validation(userJoiSchema), changeUser); // Route to validate and change user information
userRoute.delete("/:id", deleteUser); // Route to delete a user



// ---- Export the user router for use in other parts of the application

module.exports = { userRoute };
