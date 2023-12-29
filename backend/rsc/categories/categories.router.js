const {getCategories, createCategory} = require("./categories.controller")
const express = require("express")
const categoryRoute = express.Router()

categoryRoute.get("/", getCategories)
categoryRoute.post("/", createCategory)


module.exports = {categoryRoute}