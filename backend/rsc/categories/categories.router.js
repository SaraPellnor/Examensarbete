const {getCategories, createCategory, changeCategory, deleteCategory, getCategoryById} = require("./categories.controller")
const express = require("express")
const categoryRoute = express.Router()

categoryRoute.get("/", getCategories)
categoryRoute.post("/", createCategory)
categoryRoute.post("/:id", changeCategory)
categoryRoute.get("/:id", getCategoryById)
categoryRoute.delete("/:id", deleteCategory)


module.exports = {categoryRoute}