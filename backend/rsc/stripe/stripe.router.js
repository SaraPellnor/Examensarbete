
const {
  checkout, getOrder
  } = require("./stripe.controllers");


const express = require("express");
  


  // ---- Create an Express Router instance

  const stripeRoute = express.Router();
  


  // ---- Define route handlers for different HTTP methods and paths
  
  stripeRoute.post("/stripe/checkout", checkout);
  stripeRoute.get("/stripe/order/:id", getOrder);

  

  


  // ---- Export the stripeRoute for use in other files

  module.exports = { stripeRoute };
  