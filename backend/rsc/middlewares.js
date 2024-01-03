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



// ---- Export the validation function for use in other parts of the application

module.exports = {
  validation,
};
