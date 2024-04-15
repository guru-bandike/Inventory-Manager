// Define and export HomeController class for
export default class HomeConroller {
  // Render the Home view
  static getHomeView(req, res) {
    const isLoggedIn = req.session.userEmail ? true : false;
    return res.render('home', { isLoggedIn });
  }
}
