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

categoryRoute.get("/categories/", getCategories);

categoryRoute.post("/categories/create", createCategory);

categoryRoute.post("/categories/update/:id", changeCategory);

categoryRoute.get("/categories/:id", getCategoryById);

categoryRoute.delete("/categories/delete/:id", deleteCategory);



// ---- Export the categoryRoute for use in other parts of your application

module.exports = { categoryRoute };
