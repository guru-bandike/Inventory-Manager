export default class UserModel {
  // Constructor to initialize user properties
  constructor(_id, _name, _email, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }

  // Add new user to the database
  static add(name, email, password) {
    const newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
  }

  static isValid(email, password) {
    return users.some((user) => user.email == email && user.password == password);
  }

  // Check if user exists
  static isExists(email) {
    return users.some((user) => user.email == email);
  }

  // Get all existing users
  static getAll() {
    return users;
  }
}

// Existing users
var users = [
  new UserModel(1, 'guru', 'guru@gmail.com', 'pass.guru'),
  new UserModel(2, 'veera', 'veera@gmail.com', 'pass.veera'),
  new UserModel(3, 'sathi', 'sathi@gmail.com', 'pass.sathi'),
];
