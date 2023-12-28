const {Schema, model, models} = require("mongoose")

const userSchema = new Schema({
    isAdmin: {type: Boolean, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
},{ versionKey: false })

const UserModel = models.user || model("user", userSchema)

module.exports = {UserModel}