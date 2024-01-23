// ---- Middleware function for general validation based on a Joi schema

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

// ---- checks if user is an admin

const isAdmin = (req, res, next) => {
  try {
    const user = req.session.user;
    !user.is_admin
      ? res.status(400).json("you are not an admin, sorry")
      : next();
  } catch (err) {
    res.status(400).json(err);
  }
};

// ---- Check authentication based on user session

const auth = (req, res, next, err) => {
  try {
    !req.session.user ? res.status(400).json(err) : next();
  } catch (error) {
    res.status(400).json(err);
  }
};

// ---- Export the validation function for use in other parts of the application

module.exports = {
  validation,
  isAdmin,
  auth,
};
