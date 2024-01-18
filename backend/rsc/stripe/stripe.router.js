// ---- Import Joi schema and controller functions from the specified file

const {
  checkout
  } = require("./stripe.controllers");
// const { productJoiSchema } = require("./products.model");


// ---- Import validation middleware for use when needed

// const { validation } = require("../middlewares");
const express = require("express");
  


  // ---- Create an Express Router instance

  const stripeRoute = express.Router();
  


  // ---- Define route handlers for different HTTP methods and paths
  
  stripeRoute.post("/stripe/checkout", checkout);
  
  // productRoute.get("/products/:id", getProductsById);
  
  // productRoute.post("/products/create", validation(productJoiSchema), createProduct);
  
  // productRoute.post("/products/update/:id", validation(productJoiSchema), changeProduct);
  
  // productRoute.delete("/products/delete/:id", deleteProduct);
  


  // ---- Export the productRoute for use in other files

  module.exports = { stripeRoute };
  