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
// const {auth} = require("../middlewares")

const { userJoiSchema } = require("./user.model");



// ---- Import validation middleware for use when needed

const { validation } = require("../middlewares");
const express = require("express");



// ---- Create an Express Router for user routes

const userRoute = express.Router();



// ---- Assign different HTTP methods to respective controller functions

userRoute.get("/user/auth", isUserLoggedIn);
userRoute.get("/user/", getUsers); 
userRoute.get("/user/:id", getUserById);
userRoute.post("/user/create", validation(userJoiSchema), createUser); 
userRoute.post("/user/login", logInUser); 
userRoute.post("/user/logout", logOutUser);
userRoute.post("/user/update/:id", validation(userJoiSchema), changeUser);
userRoute.delete("/user/delete:id", deleteUser); 



// ---- Export the user router for use in other parts of the application

module.exports = { userRoute };
