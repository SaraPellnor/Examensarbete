const {Schema, model, models} = require("mongoose")

const productSchema = new Schema({
    product_title: {type: String, required: true},
    product_description: {type: String, required: true},
    product_image: {type: String, required: true},
    product_price: {type: Number, required: true},
    in_stock: {type: Number, required: true},
    category: {type: Array, required: true}
},{ versionKey: false })

const ProductModel = models.products || model("products", productSchema)

module.exports = {ProductModel}