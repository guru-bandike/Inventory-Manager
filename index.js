// Import necessary modules
import express from 'express';
import path from 'path';
import HomeConroller from './src/controllers/home.controller.js';
import ProductsController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import expressEjsLayouts from 'express-ejs-layouts';
import ensureUserNotExists from './src/middleweres/ensureUserNotExists.validation.middleware.js';
import validateProduct from './src/middleweres/validateProduct.validation.middleware.js';
import ensureProductExists from './src/middleweres/ensureProductExists.validation.middleware.js';
import { uploadFile } from './src/middleweres/file-upload.middleware.js';

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
server.get('/login', UserController.getLoginView);
server.get('/register', UserController.getRegistrationView);
server.get('/products', ProductsController.getProductsView);
server.get('/add-product', ProductsController.getAddFormView);
server.get('/update-product/:id', ensureProductExists, ProductsController.getUpdateProductView);
server.post('/register', ensureUserNotExists, UserController.postUserRegistration);
server.post('/login', UserController.postLoginRequest);
server.post(
  '/add-product',
  uploadFile.single('imageUrl'),
  validateProduct('add-product'),
  ProductsController.postAddProduct
);
server.post(
  '/update-product/:id',
  ensureProductExists,
  uploadFile.single('imageUrl'),
  validateProduct('update-product'),
  ProductsController.postUpdateProduct
);
server.post('/delete-product/:id', ensureProductExists, ProductsController.deleteProduct);

// Start the server and listen on port 3400
server.listen(3400, () => {
  console.log('Server is listening on 3400 port');
});
