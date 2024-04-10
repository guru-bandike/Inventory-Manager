import ProductModel from '../models/products.model.js';

// Define delete request validation middleware
const validateDeleteRequest = (req, res, next) => {
  const productId = req.params.id; // Extract product id form request params

  // Check if product exists
  const isProductExists = ProductModel.exists(productId);

  // If product does not exists, send a 404 response
  if (!isProductExists) {
    return res.status(404).send('Product not found!');
  }

  // If product exists, proceed to the next middleware
  next();
};

export default validateDeleteRequest;
