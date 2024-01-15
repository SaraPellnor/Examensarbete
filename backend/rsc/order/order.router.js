// ---- Import necessary modules and dependencies

const {
  getOrders,
  createOrder,
  getOrderById,
  changeOrder,
  deleteOrder,
} = require("./order.controller");



// ---- Import middlewares for authentication, authorization, and validation

const { isAdmin, auth, validation } = require("../middlewares");



// ---- Import Joi schema for order validation

const { orderJoiSchema } = require("./order.model");



// ---- Import Express to create a router

const express = require("express");
const orderRoute = express.Router();



// ---- Assign different HTTP methods to respective controller functions

orderRoute.get("/order", auth, getOrders);
orderRoute.post("/order/create", auth, validation(orderJoiSchema), createOrder);
orderRoute.get("/order/:id", getOrderById);
orderRoute.post(
  "/order/update/:id",
  isAdmin,
  validation(orderJoiSchema),
  changeOrder
);
orderRoute.delete("/order/delete/:id", isAdmin, deleteOrder);



// ---- Export the orderRoute for use in other parts of your application

module.exports = { orderRoute };
