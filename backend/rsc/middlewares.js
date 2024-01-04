<<<<<<< HEAD
=======
// ---- Middleware function for general validation based on a Joi schema

>>>>>>> a38e7a61e903b7cfcc0f54606c8317dc8fcd0147
const validation = (joiSchema) => {
  return (req, res, next) => {
    try {
      // Validate incoming data against the specified Joi schema
      const validated = joiSchema.validate(req.body);

      // If validation fails, send a 400 Bad Request status with the error message
      validated.error
        ? res.status(400).json(validated.error.message)
        : // If validation is successful, proceed to the next middleware
          next();
    } catch (err) {
      // If validation encounters an error, send a 400 Bad Request status with the error
      res.status(400).json(err);
    }
  };
};

<<<<<<< HEAD
const isAdmin = (req, res, next) => {
  try {
    const user = req.session.user;
    console.log(user);
    user.admin ? next() : res.status(400).json("you are not an admin, sorry");
  } catch (err) {
    res.status(400).json(err);
  }
};
=======


// ---- Export the validation function for use in other parts of the application
>>>>>>> a38e7a61e903b7cfcc0f54606c8317dc8fcd0147

module.exports = {
  validation,
  isAdmin,
};
