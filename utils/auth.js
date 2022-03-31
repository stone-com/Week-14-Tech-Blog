const withAuth = (req, res, next) => {
  // check if uder is logged in, if they are not, then redirct them to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    //  if they are logged in, call next
    next();
  }
};

module.exports = withAuth;
