import ProductModel from "../models/products.model.js";

// Define check product exists middleware
const checkProductExists = (req, res, next) => {
    const productId = req.params.id; // Extract product id from request parameters

    // Check if product exists
    const isExists = ProductModel.exists(productId) 

    // If product exists, proceed to the next middleware
    if (isExists) {
        next();
    } else {
    // If product does not exists, send product not found response
        res.status(404).send('Product not found!')
    }
}

export default checkProductExists;