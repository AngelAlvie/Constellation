var login = require('./signin');
var signup = require('./signup');
var User = require('../models/user');

// configure passport taken from https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619

module.export = function(passport) {

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

login(passport);
signup(passport);
}
