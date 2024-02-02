const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

// ---- Define the Mongoose schema for the order model

const orderSchema = new Schema(
  {
    user_ID: { type: String, required: true },
    productList: { type: Array, required: true },
    address: { type: Object, required: true },
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
  productList: Joi.array().items(Joi.object()).required(),
  address: Joi.object().required(),
  shipped: Joi.boolean().required(),
  total_price: Joi.number().required(),
  date: Joi.string().required(),
});

// ---- Export both the Mongoose model and the Joi schema

module.exports = { OrderModel, orderJoiSchema };
