const { Schema, model, models, Types } = require("mongoose");
const Joi = require("joi");



// ---- Define the schema for the products in orderSchema

const productSchema = new Schema({
  product_ID: { type: Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});



// ---- Define the Mongoose schema for the order model

const orderSchema = new Schema(
  {
    user_ID: { type: Types.ObjectId, ref: 'User', required: true },
    products: { type: [productSchema], required: true },
    shipped: { type: Boolean, required: true },
    total_price: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { versionKey: false }
);



// ---- Create the Mongoose model for the order

const OrderModel = models.order || model("order", orderSchema);



// ---- Define the Joi schema for order validation

const orderJoiSchema = Joi.object({
  user_ID: Joi.string().required(),
  products: Joi.array().items(Joi.object()).required(),
  shipped: Joi.boolean().required(),
  total_price: Joi.number().required(),
  date: Joi.string().required(),
});



// ---- Export both the Mongoose model and the Joi schema

module.exports = { OrderModel, orderJoiSchema };
