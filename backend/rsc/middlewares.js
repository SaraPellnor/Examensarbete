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

const isAdmin = (req, res, next) => {
  try {
    const user = req.session.user;
    console.log(user);
    user.admin ? next() : res.status(400).json("you are not an admin, sorry");
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  validation,
  isAdmin,
};
