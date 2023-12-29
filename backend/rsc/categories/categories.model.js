const {Schema, model, models} = require("mongoose")

const categorySchema = new Schema({
    category_title: {type: String, required: true},
    category_description: {type: String, required: true},
    category_image: {type: String, required: true}
},{ versionKey: false })

const CategoryModel = models.category || model("category", categorySchema)

module.exports = {CategoryModel}