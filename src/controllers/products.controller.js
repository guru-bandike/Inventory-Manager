import ProductModel from '../models/products.model.js';

// Controller for managing views and products
export default class ProductsController {
  // Render products view
  static getProductsView(req, res) {
    const products = ProductModel.getAll();
    res.render('products', { products, successMessage: null });
  }

  // Render add product form view
  static getAddFormView(req, res) {
    res.render('add-product', { validationErrors: null, successMessage: null, product: {} });
  }

  // Render update product view
  static getUpdateProductView(req, res) {
    const id = req.params.id; // Extract product id from request parameters
    const requestedProduct = ProductModel.getById(id); // Get product from the Product module

    // Render 'update-product' view with requested product
    res.render('update-product', { product: requestedProduct, validationErrors: null, successMessage: null });
  }

  // Handle add new product request
  static postAddProduct(req, res) {
    // Extract and store new product details from request body and file
    const newProductObj = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: 'images/' + req.file.filename,
    };
    ProductModel.add(newProductObj); // Add new product using product model

    // Render add-product view with success message
    res.render('add-product', {
      validationErrors: null,
      successMessage: 'Product Added Successfully!',
      product: {},
    });
  }

  // Handle update product request
  static postUpdateProduct(req, res) {
    // Extract and store updated product details from request body and file
    const updatedProduct = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: 'images/' + req.file.filename,
    };

    // Check if the product is updated
    const isUpdated = ProductModel.update(updatedProduct);

    // If the product is updated, Render the 'update-product' view with updatedProduct and a success message
    if (isUpdated) {
      return res.render('update-product', {
        validationErrors: null,
        successMessage: 'Product Updated Successfully!',
        product: updatedProduct,
      });
    }

    // If the product not updated, send product not found response
    res.status(404).send('Product not found!');
  }

  // Handle delete product request
  static deleteProduct(req, res) {
    const productId = req.params.id; // Extract product id from request body

    // Check if the product is deleted
    const isDeleted = ProductModel.delete(productId);

    // If the product is deleted, Render the 'products' view with all existing products and a success message
    if (isDeleted) {
      const products = ProductModel.getAll(); // Get all existing products from the Product module
      return res.render('products', { products, successMessage: 'Product Successfully deleted!' });
    }
    
    // If the product not deleted, send product not found response
    res.status(404).send('Product not found!');
  }
}
