var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Star = require('../models/star.js');
var Constellation = require('../models/constellation.js');
var passport = require('passport');

// TODO: Implement Authentication for all subsequent pages
// TODO: Implement search algorithm
// TODO: Figure out how to modify the request body to make it possible to tell whether or not the user is searching for constellations or stars
// TODO: Create new routes for the new pages Thad made
//      -Thad did this already lol
// TODO: Upon post from nebula: store new constellation/star and link to the user
// TODO: Allow user to "bookmark" a star or constellation using an AJAX request
// TODO: handle search and profile using Handlebars

//this was also taken from https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
/* EXAMPLE:
router.get('/home', isAuthenticated, function(req, res){
  res.render('home', { user: req.user });
});

this is how to get the count of some amount of documents
userModel.count({}, function( err, count){
    console.log( "Number of users:", count );
})

// As with any middleware it is quintessential to call next()
// if the user is authenticated
*/
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('index', {title: 'Constellation - ' + req.user.Username, extra: '<div class="formContainer"><button class="button" onclick="profileClicked()">Profile</button><button class="button" onclick="signOutClicked()">Sign Out</button></div>'});
  } else {
    res.render('index', { title: 'Constellation - Welcome', extra: '<div class="formContainer"><button class="button" onclick="signInClicked()">Sign In</button><button class="button" onclick="signUpClicked()">Sign Up</button></div>'});
  }
});

/* Perform a search -- implement search algorithm */
router.post('/search', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('search', {title: 'Constellation - Search', extra: '<div class="formContainer"><button class="button" onclick="profileClicked()">Profile</button><button class="button" onclick="signOutClicked()">Sign Out</button></div>'});
  } else {
    res.render('search', { title: 'Constellation - Search', extra: '<div class="formContainer"><button class="button" onclick="signInClicked()">Sign In</button><button class="button" onclick="signUpClicked()">Sign Up</button></div>'});
  }
});
router.get('/search', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('search', {title: 'Constellation - Search', extra: '<div class="formContainer"><button class="button" onclick="profileClicked()">Profile</button><button class="button" onclick="signOutClicked()">Sign Out</button></div>'});
  } else {
    res.render('search', { title: 'Constellation - Search', extra: '<div class="formContainer"><button class="button" onclick="signInClicked()">Sign In</button><button class="button" onclick="signUpClicked()">Sign Up</button></div>'});
  }
});
/* sign in using passport */

//redirect will use the GET method

router.post('/signIn', passport.authenticate('signin', {
    successRedirect: '/',
    failureRedirect: '/signIn',
}));

/* GET the signin page */
router.get('/signIn',function(req, res, next) {
  res.render('signIn', {title: 'Constellation - Sign Up'});
});

/* sign up form */
router.post('/signUp', passport.authenticate('signup', {
    successRedirect: '/signUp2',
    failureRedirect: '/signUp'
  }));
/* GET sign up page */
router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'Constellation - Sign Up' });
});
/*sign up 2 never existed*/
/* GET sign up page 3*/
router.get('/signUp2', function(req, res, next) {
  res.render('signUp2', { title: 'Constellation - Sign Up' });
});

/* implement sign out*/
router.get('/signOut', function(req, res) {
  req.logout();
  res.redirect('back');
});

router.get('/constellation', function(req, res, next) {
  res.render('constellation', {title: 'Constellation - Browsing'});
});

router.get('/star', function(req, res, next) {
  res.render('star', {title: 'Constellation - Browsing'});
});

router.get('/profile', function(req, res, next){
  res.render('profile', {title:'Constellation - Profile'});
});

router.get('/nebula', function(req, res, next){
  res.render('nebula',{title:'Constellation - Nebula'});
});

router.get('/myConstellations', function(req, res, next){
  res.render('myConstellations',{title:'Constellation - Profile'});
});

router.get('/myStars', function(req, res, next){
  res.render('myStars',{title:'Constellation - Profile'});
});

router.get('/savedConstellations', function(req, res, next){
  res.render('savedConstellations',{title:'Constellation - Profile'});
});

router.get('/savedStars', function(req, res, next){
  res.render('savedStars',{title:'Constellation - Profile'});
});
module.exports = router;
