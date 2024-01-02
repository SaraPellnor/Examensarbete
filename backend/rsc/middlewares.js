// const {userValidation} = require("./user/user.model")
const validation = (joiSchema) => {
  return (req, res, next) => {
    try {
      console.log(req.body, joiSchema);
      const validated = joiSchema.validate(req.body);
      validated && next();
    } catch (err) {
      res.status(400).json(err);
    }
  };
};

module.exports = {
  validation,
};
