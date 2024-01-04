// ---- Import necessary modules from mongoose

const { Schema, model, models } = require("mongoose");



// ---- Define the schema for the category model

const categorySchema = new Schema({
  category_title: { type: String, required: true },
  category_description: { type: String, required: true },
  category_image: { type: String, required: true }
}, { versionKey: false });  // Disable versioning (_v) in the schema



// ---- Create the Mongoose model for the category

const CategoryModel = models.category || model("category", categorySchema);



// ---- Export the CategoryModel for use in other parts of your application

module.exports = { CategoryModel };
