var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // Passport for local authentication.

module.exports = passport;

module.exports.init = function(app) {
  app.use(passport.initialize()); // Initialize passport.
  app.use(passport.session()); // User persistent login sessions.

  passport.use(new LocalStrategy(
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { 
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
}

module.exports.auth = function(req, res, next){ 
  if (!req.isAuthenticated()) {
    res.sendStatus(401); 
  }
  else {
    next();
  }
}