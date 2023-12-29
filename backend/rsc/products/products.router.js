const {getProducts, getProductsById, createProduct, changeProduct, deleteProduct} = require("./products.controller")
const express = require("express")
const productRoute = express.Router()

productRoute.get("/", getProducts)
productRoute.get("/:id", getProductsById)
productRoute.post("/", createProduct)
productRoute.post("/:id", changeProduct)
productRoute.delete("/:id", deleteProduct)



module.exports = {productRoute}