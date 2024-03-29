// ---- Import Joi schema and controller functions from the specified file

const {
    getProducts,
    getProductsById,
    createProduct,
    changeProduct,
    deleteProduct
  } = require("./products.controller");
const { productJoiSchema } = require("./products.model");


// ---- Import validation middleware for use when needed

const { validation } = require("../middlewares");
const express = require("express");
  


  // ---- Create an Express Router instance

  const productRoute = express.Router();
  


  // ---- Define route handlers for different HTTP methods and paths
  
  productRoute.get("/products/", getProducts);
  
  productRoute.get("/products/:id", getProductsById);
  
  productRoute.post("/products/create", validation(productJoiSchema), createProduct);
  
  productRoute.post("/products/update/:id", validation(productJoiSchema), changeProduct);
  
  productRoute.delete("/products/delete/:id", deleteProduct);
  


  // ---- Export the productRoute for use in other files

  module.exports = { productRoute };
  