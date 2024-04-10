// Define and export HomeController class for 
export default class HomeConroller {

  // Render the Home view
  static getHomeView(req, res) {
    return res.render('home');
  }
}
