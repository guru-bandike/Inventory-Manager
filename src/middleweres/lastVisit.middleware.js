// Define setLastVisit middleware to handle setting the last visit time for user
const setLastVisit = (req, res, next) => {
  const lastVisitTime = req.cookies.lastVisit; // Extract last vist time from cookie
  // Check if the user has previously visited the site
  if (lastVisitTime) {
    // If the user has visited before, set the response locals lastVisit property
    // to the previous visited time for displaying to the user
    res.locals.lastVisit = lastVisitTime;
  }

  // Set the current time as the last visit time for the user next visit
  res.cookie('lastVisit', new Date().toLocaleString(), {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  // Proceed to the next middleware
  next();
};

export default setLastVisit;
