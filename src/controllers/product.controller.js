import ProductModel from '../models/product.model.js';

// Controller for managing views and products
export default class ProductsController {
  // Render products view
  static getProductsView(req, res) {
    const products = ProductModel.getAll(); // Get all existing products using product model
    const isLoggedIn = getUserLoginStatus(req); // Get user login status
    res.render('products', { products, isLoggedIn }); // Render products view with existing products
  }

  // Render add product form view
  static getAddFormView(req, res) {
    const isLoggedIn = getUserLoginStatus(req); // Get user login status
    res.render('add-product', { product: {}, isLoggedIn });
  }

  // Render update product view
  static getUpdateProductView(req, res) {
    const id = req.params.id; // Extract product id from request parameters
    const requestedProduct = ProductModel.getById(id); // Get product from the Product module
    const isLoggedIn = getUserLoginStatus(req); // Get user login status

    // Render 'update-product' view with requested product
    res.render('update-product', { product: requestedProduct, isLoggedIn });
  }

  // Handle add new product request
  static postAddProduct(req, res) {
    const { name, description, price } = req.body; // Extract new product details from request body
    const imageUrl = 'images/' + req.file.filename; // Construct product image url
    const newProductObj = { name, description, price, imageUrl }; // Create new product object
    const isLoggedIn = getUserLoginStatus(req); // Get user login status
    ProductModel.add(newProductObj); // Add new product using product model

    // Render add-product view with success message
    res.render('add-product', {
      successMessage: 'Product Added Successfully!',
      product: {},
      isLoggedIn,
    });
  }

  // Handle update product request
  static postUpdateProduct(req, res) {
    const { name, description, price } = req.body; // Extract new product details from request body
    const imageUrl = 'images/' + req.file.filename; // Construct product image url
    const updatedProduct = { name, description, price, imageUrl }; // Create updated product object
    const isLoggedIn = getUserLoginStatus(req); // Get user login status

    // Update product using product model
    ProductModel.update(updatedProduct);

    // Render update-product vew with success message
    res.render('update-product', {
      validationErrors: null,
      successMessage: 'Product Updated Successfully!',
      product: updatedProduct,
      isLoggedIn,
    });
  }

  // Handle delete product request
  static deleteProduct(req, res) {
    const productId = req.params.id; // Extract product id from request body
    const isLoggedIn = getUserLoginStatus(req); // Get user login status

    // Delete requsted product using product model
    ProductModel.delete(productId);

    const products = ProductModel.getAll(); // Get all existing products using Product module
    // Render products view with success message
    return res.render('products', { products, successMessage: 'Product Successfully deleted!', isLoggedIn });
  }
}

// Helper function to get user login status
function getUserLoginStatus(req) {
  return req.session.userEmail ? true : false;
}
