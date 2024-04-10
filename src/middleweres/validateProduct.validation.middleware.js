import { body, validationResult } from 'express-validator';

// Define validation middleware for validating product data
const validateProduct = (viewName) => {
  return async (req, res, next) => {

    // Define validation rules for product data
    const rules = [
      body('name')
        .notEmpty({})
        .withMessage('Name should not be empty!')
        .isLength({ min: 3 })
        .withMessage('Name should atleast contain 3 charectors!'),
      body('description')
        .notEmpty()
        .withMessage('Description should not be empty!')
        .isLength({ min: 10 })
        .withMessage('Description should atleast contain 10 charectors!'),
      body('price').isFloat({ gt: 0 }).withMessage('Price should be greater than zero!'),
      body('imageUrl').isURL().withMessage('Invalid image URL!'),
    ];

    // Run validation rules
    await Promise.all(
      rules.map((rule) => {
        return rule.run(req);
      })
    );
    // Collect validation errors, if any
    const validationErrors = validationResult(req);

    // 4. If no validation errors, Proceed to the next middleware
    if (validationErrors.isEmpty()) {
      next();
    } else {
    // If validation errors exists, Render corresponding view with errors and input data
      const requestedProduct = req.body;
      res.render(viewName, {
        validationErrors: validationErrors.array(),
        successMessage: null,
        product: requestedProduct,
      });
    }
  };
};

export default validateProduct;
