// Import necessary External modules
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import expressEjsLayouts from 'express-ejs-layouts';

// Import necessary Core modules
import path from 'path';

// Import necessary Internal modules
import HomeConroller from './src/controllers/home.controller.js';
import ProductsController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import ensureUserNotExists from './src/middleweres/ensureUserNotExists.validation.middleware.js';
import validateProduct from './src/middleweres/validateProduct.validation.middleware.js';
import ensureProductExists from './src/middleweres/ensureProductExists.validation.middleware.js';
import { uploadFile } from './src/middleweres/file-upload.middleware.js';
import auth from './src/middleweres/auth.middleware.js';
import setLastVisit from './src/middleweres/lastVisit.middleware.js';

// Create Express server instance
const server = express();

// Setup middlewares
server.use(express.static(path.join(path.resolve(), 'src', 'views'))); // Serve static files from 'views' directory for redering views
server.use(express.static(path.join(path.resolve(), 'public'))); // Serve static files from 'public' directory for client-side assets
server.use(cookieParser());// Use the cookie-parser middleware to handle cookies
server.use(session({ secret: 'testSecretKey', resave: false, saveUninitialized: true, cookie: { secure: false } })); // Configure session middleware
server.use(express.json()); // Parse imcoming JSON bodies
server.use(express.urlencoded({ extended: true })); // Parse imcoming URL-encoded bodies
server.use(expressEjsLayouts); // Use EJS layouts for redering views with layouts

server.set('view engine', 'ejs'); // Set EJS as view-engine
server.set('views', path.join(path.resolve(), 'src', 'views')); // Set views directory path

// Define routes and corresponding controllers
server.get('/', auth, setLastVisit, HomeConroller.getHomeView);
server.get('/login', UserController.getLoginView);
server.get('/logout', UserController.logout);
server.get('/register', UserController.getRegistrationView);
server.get('/products', auth, ProductsController.getProductsView);
server.get('/add-product', auth, ProductsController.getAddFormView);
server.get('/update-product/:id', auth, ensureProductExists, ProductsController.getUpdateProductView);
server.post('/register', ensureUserNotExists, UserController.postUserRegistration);
server.post('/login', UserController.login);
server.post(
  '/add-product',
  auth,
  uploadFile.single('imageUrl'),
  validateProduct('add-product'),
  ProductsController.postAddProduct
);
server.post(
  '/update-product/:id',
  auth,
  ensureProductExists,
  uploadFile.single('imageUrl'),
  validateProduct('update-product'),
  ProductsController.postUpdateProduct
);
server.post('/delete-product/:id', auth, ensureProductExists, ProductsController.deleteProduct);

// Start the server and listen on port 3400
server.listen(3400, () => {
  console.log('Server is listening on 3400 port');
});
