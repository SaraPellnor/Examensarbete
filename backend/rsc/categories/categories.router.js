// ---- Import necessary functions from the categories.controller module

const {
  getCategories,
  createCategory,
  changeCategory,
  deleteCategory,
  getCategoryById
} = require("./categories.controller");



// ---- Import Express to create a router

const express = require("express");
const categoryRoute = express.Router();



// ---- Assign different HTTP methods to respective controller functions

categoryRoute.get("/", getCategories);

categoryRoute.post("/create", createCategory);

categoryRoute.post("/update/:id", changeCategory);

categoryRoute.get("/:id", getCategoryById);

categoryRoute.delete("/delete/:id", deleteCategory);



// ---- Export the categoryRoute for use in other parts of your application

module.exports = { categoryRoute };
