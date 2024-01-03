// ---- Import Joi validation and necessary components from Mongoose

const Joi = require('joi');

const { Schema, model, models } = require("mongoose");



// ---- Define the product schema with required fields

const productSchema = new Schema({
    product_title: { type: String, required: true },
    product_description: { type: String, required: true },
    product_image: { type: String, required: true },
    product_price: { type: Number, required: true },
    in_stock: { type: Number, required: true },
    category: { type: Array, required: true }
}, { versionKey: false });  // Disable versioning field



// ---- Define the Joi schema for the product

const productJoiSchema = Joi.object({
    product_title: Joi.string().required(),
    product_description: Joi.string().required(),
    product_image: Joi.string().required(),
    product_price: Joi.number().required(),
    in_stock: Joi.number().required(),
    category: Joi.array().items(Joi.string()).required(),
});



// ---- Create or retrieve the 'products' model based on the schema
// ---- If the model already exists, use it; otherwise, create a new one

const ProductModel = models.products || model("products", productSchema);



// ---- Export the ProductModel for use in other files

module.exports = { ProductModel, productJoiSchema };
