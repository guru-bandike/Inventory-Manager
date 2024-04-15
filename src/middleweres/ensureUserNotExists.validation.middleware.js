import UserModel from '../models/user.model.js';

// Define ensureUserNotExists middleware
const ensureUserNotExists = (req, res, next) => {
  const userEmail = req.body.email; // Extract user emial id from request body

  // Check if user exists using user model
  const isUserExists = UserModel.isExists(userEmail);

  // If user exists, render registration view with error message
  if (isUserExists) {
    res.render('register', { errorMessage: 'A user with this email already exists.' });
  } else {
    // If user does not exists, proceed to next middleware
    next();
  }
};

export default ensureUserNotExists;
