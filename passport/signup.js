var passport = require('passport');
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = function(passport) {
  passport.use('signup', new LocalStrategy({passReqToCallback:true},
    function(req, username, password, done) {
      User.findOne({'Username' : username}, function(err, user) {
        if(err) {
          console.log('Error on signup: ' + err);
          return done(err);
        }
        // check if user already exists
        if(user) {
          console.log("User already exists");
          return done(null, false, {message: 'Username already taken'});
        } else {
          //check for email here
          User.findOne({'Email' : req.param('email')}, function(err, email) {
            if(err) {
              console.log('Error on signup: ' + err);
              return done(err);
            }
            if (email) {
              console.log("Email already in use");
              return done(null, false, {message: 'Email already in use'})
            }
            if (!email) {
              var newUser = new User();
              newUser.Username = username;
              newUser.Password = createHash(password);
              newUser.Email = req.param('email');

              newUser.save(function(err) {
                if (err) {
                  console.log("error saving user");
                  throw err;
                }
                console.log('New user created');
                return done(null, newUser);
              });
            }
          });
        }
      }
  process.nextTick(findOrCreateUser);
  }););
};
