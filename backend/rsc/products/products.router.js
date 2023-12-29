const {getProducts, createProduct} = require("./products.controller")
const express = require("express")
const productRoute = express.Router()

productRoute.get("/", getProducts)
productRoute.post("/", createProduct)


module.exports = {productRoute}