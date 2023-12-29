const {Schema, model, models} = require("mongoose")

const orderSchema = new Schema({
    user_ID: {type: String, required: true},
    product_ID: {type: Array, required: true},
    shipped: {type: Boolean, required: true},
    total_price: {type: Number, required: true},
    date: {type: String, required: true}
},{ versionKey: false })

const OrderModel = models.order || model("order", orderSchema)

module.exports = {OrderModel}