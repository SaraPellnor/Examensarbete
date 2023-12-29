const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    isAdmin: { type: Boolean, required: true },
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
      match: /^\S+@\S+\.\S+$/,
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 },
  },
  { versionKey: false }
);

const UserModel = models.user || model("user", userSchema);

module.exports = { UserModel };
