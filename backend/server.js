require('dotenv').config();
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {orderRoute} = require("./rsc/order/order.router")
const {productRoute} = require("./rsc/products/products.router")
const {userRoute} = require("./rsc/user/user.router")
const {categoryRoute} = require("./rsc/categories/categories.router")

const apiKey = process.env.API_KEY;

app.use(express.json())

app.use("/user", userRoute)
app.use("/order", orderRoute)
app.use("/products", productRoute)
app.use("/categories", categoryRoute)



const init = async () => {
    await mongoose.connect(`mongodb+srv://sarapellnor:${apiKey}@cluster0.qcltdmb.mongodb.net/`)
    app.listen(3000, () => console.log("server is up and running at localhost 3000"))
}
init()

