import UserModel from '../models/user.model.js';

// Controller for User management
export default class UserController {
  // Render rigistration view
  static getRegistrationView(req, res) {
    res.render('register');
  }

  // Render login view
  static getLoginView(req, res) {
    res.render('login');
  }

  // Handle user registration request
  static postUserRegistration(req, res) {
    const { name, email, password } = req.body; // Extract user properies
    UserModel.add(name, email, password); // Register user using user module

    // Redirect to login view
    res.redirect('/login');
  }

  // Handle login request
  static login(req, res) {
    const { email, password } = req.body; // Extract user details from reqest body
    const isValid = UserModel.isValid(email, password); // Check if user is valid

    // If user is valid, redirect to the home view
    if (isValid) {
      req.session.userEmail = email;
      res.redirect('/');
    } else {
      // If user is not valid, Render login view with an error message
      res.render('login', { errorMessage: 'Incorrect credentials' });
    }
  }

  static logout(req, res) {
    req.session.destroy( (err) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/login');
      }
    });
  }
}
