// Import necessary modules
import express from 'express';
import path from 'path';
import HomeConroller from './src/controllers/home.controller.js';
import ProductsController from './src/controllers/products.controller.js';
import expressEjsLayouts from 'express-ejs-layouts';
import validateProduct from './src/middleweres/validateProduct.validation.middleware.js';
import validateDeleteRequest from './src/middleweres/deleteProduct.validation.middleware.js';
import checkProductExists from './src/middleweres/checkProductExists.validation.middleware.js';

// Create Express server instance
const server = express();

// Setup middlewares
server.use(express.static(path.join(path.resolve(), 'src', 'views'))); // Serve static files from 'views' directory for redering views
server.use(express.static(path.join(path.resolve(), 'public'))); // Serve static files from 'public' directory for client-side assets
server.use(express.json()); // Parse imcoming JSON bodies
server.use(express.urlencoded({ extended: true })); // Parse imcoming URL-encoded bodies
server.use(expressEjsLayouts); // Use EJS layouts for redering views with layouts

server.set('view engine', 'ejs'); // Set EJS as view-engine 
server.set('views', path.join(path.resolve(), 'src', 'views')); // Set views directory path

// Define routes and corresponding controllers
server.get('/', HomeConroller.getHomeView);
server.get('/products', ProductsController.getProductsView);
server.get('/add-product', ProductsController.getAddFormView);
server.get('/update-product/:id', checkProductExists, ProductsController.getUpdateProductView);
server.post('/delete-product/:id', validateDeleteRequest, ProductsController.deleteProduct);
server.post('/add-product', validateProduct('add-product'), ProductsController.postAddProduct);
server.post('/update-product/:id', validateProduct('update-product'), ProductsController.postUpdateProduct);

// Start the server and listen on port 3400
server.listen(3400, () => {
  console.log('Server is listening on 3400 port');
});
