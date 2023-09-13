const { body, validationResult } = require('express-validator');

const validateName = [
  // Use 'express-validator' to check if 'name' is a string
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .custom((value) => {

      // Use a regex pattern to check if 'name' contains only alphabetic characters
      if (/^[A-Za-z ]+$/.test(value)){
        return true; 
      }
      throw new Error('Name must contain only alphabetic characters');
    }),

  // Middleware function to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(422).json({ errorMessage: errorMessages });
    }

    next();
  },
];

module.exports = {
  validateName,
};

