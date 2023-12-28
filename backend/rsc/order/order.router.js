const {getOrders, createOrder} = require("./order.controller")
const express = require("express")
const orderRoute = express.Router()

orderRoute.get("/", getOrders)
orderRoute.post("/", createOrder)


module.exports = {orderRoute}