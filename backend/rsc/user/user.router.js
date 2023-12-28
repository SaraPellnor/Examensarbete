const {getUsers, createUser} = require("./user.controller")
const express = require("express")
const userRoute = express.Router()

userRoute.get("/", getUsers)
userRoute.post("/", createUser)


module.exports = {userRoute}