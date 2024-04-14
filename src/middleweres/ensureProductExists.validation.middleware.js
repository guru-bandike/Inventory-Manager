import ProductModel from '../models/product.model.js';

// Define ensureProductExists middleware
const ensureProductExists = (req, res, next) => {
  const productId = req.params.id; // Extract product id from request parameters

  // Check if product exists using product model
  const isExists = ProductModel.isExists(productId);

  // If product exists, proceed to the next middleware
  if (isExists) {
    next();
  } else {
    // If product does not exists, send product not found response
    res.status(404).send('Product not found!');
  }
};

export default ensureProductExists;
