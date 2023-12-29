const {getOrders, createOrder, getOrderById, changeOrder, deleteOrder} = require("./order.controller")
const express = require("express")
const orderRoute = express.Router()

orderRoute.get("/", getOrders)
orderRoute.post("/", createOrder)
orderRoute.get("/:id", getOrderById)
orderRoute.post("/:id", changeOrder)
orderRoute.delete("/:id", deleteOrder)


module.exports = {orderRoute}