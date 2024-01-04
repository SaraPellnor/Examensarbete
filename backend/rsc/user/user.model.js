// ---- Import Joi for validation and Mongoose for database operations

const Joi = require("joi");
const { Schema, model, models } = require("mongoose");



// ---- Create a Mongoose schema for users

const userSchema = new Schema(
  {
    isAdmin: { type: Boolean, required: false }, 
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/, // Simple email address validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { versionKey: false } // Disable version key (_v) in documents
);



// ---- Define a Joi schema to validate incoming data

const userJoiSchema = Joi.object({
  isAdmin: Joi.boolean().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});



// ---- Create a Mongoose model for users based on the schema

const UserModel = models.user || model("user", userSchema);



// ---- Export the model and Joi schema for use in other parts of the application

module.exports = { UserModel, userJoiSchema };
