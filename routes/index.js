var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Star = require('../models/star.js');
var Constellation = require('../models/constellation.js');
var passport = require('passport');

// CENTRALIZED TASKLIST
// TODO: (CURRENT) call update to update the reference to the bookmark
// TODO: [FIXED] clean up code and comments
// TODO: Cleanup console.log() statements and add them where appropriate (severside events and errors)
// TODO: make use of middleware (next) and error handling
// TODO: [FIXED](THAD) add optional message area for Handlebars to pages where errors might occur.
// TODO: populate mesage area on error
// TODO: (THAD) make the description input element a textbox (Don't worry about this until later)
// TODO: [FIXED] Create route for bookmark
// TODO: [FIXED] Back button has no functionality
// TODO: Implement Authentication for all subsequent pages
// TODO: Implement search algorithm
// TODO: [FIXED] Allow user to "bookmark" a star or constellation using an AJAX request (clientside)
// TODO: create form filter function which prevents XSS
// TODO: [FIXED](THAD) canvas not rendering on some pages, include the main_canvas.js script for those pages
// TODO: filter user input for bad stuff, or really long things for username/title
// TODO: [FIXED] (THAD) render the background image for all the pages
// TODO: **create constellation editor
// TODO: *make post request which sends a graph structure
// TODO: *MAKE THIS SCHEMA HAVE A GRAPHSTRUCTURE BY REFERING TO THE OBJECT IDS OF starSchema
// TODO: look into the passport secret in the app.js (should it be somethiing else?)
// TODO: create background gradient either with CSS or in the canvas
// TODO: make canvas more interactive
// TODO: [FIXED] (THAD) remove renderClickedButtons from pages that don't need them (pages without star and constellation buttons)
// TODO: [FIXED] (THAD) remove new star button from saved stars
// TODO: Update the Readme
// TODO: handle invalid bookmark AJAX requests, check to make sure that there is actually a star or constellation by that ID
// TODO: handle errors involving saving properly
// TODO: make sure to use handlebars to and routing to make bookmarking a togglable thing
// TODO: implement bookmarking for constellations
// TODO: [FIXED](THAD) make the profileFill ID a class instead of an ID
// Sources:
// configure passport taken from https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
//this was also taken from https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
// using update routing found in http://blog.ocliw.com/2012/11/25/mongoose-add-to-an-existing-array/
/* Some Citations for some of the css:
* Flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
* Fixing form apperance: https://css-tricks.com/almanac/properties/a/appearance/
* Fixing outline: http://stackoverflow.com/questions/20340138/remove-blue-border-from-css-custom-styled-button-in-chrome
* Changing Placeholder text properties: https://css-tricks.com/almanac/selectors/p/placeholder/
*/
// Framewoks:
// Using node.js to run backend
// Using  Express for backend
// Using Passport for authentication
// Using mongoose to connect to a mongoDB database
// Considering using angular for frontend

var signedInHtml = '<div class="formContainer"><button class="button" onclick="profileClicked()">Profile</button><button class="button" onclick="signOutClicked()">Sign Out</button></div>';
var signedOutHtml ='<div class="formContainer"><button class="button" onclick="signInClicked()">Sign In</button><button class="button" onclick="signUpClicked()">Sign Up</button></div>';
var testResult = {Title:"Test Result Please Ignore", Description:"Test description please ignore. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", Url:"/star/100"};

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('index', {title: 'Constellation - ' + req.user.Username, extra: signedInHtml});
  } else {
    res.render('index', { title: 'Constellation - Welcome', extra: signedOutHtml});
  }
});

/* Perform a search -- implement search algorithm */
router.post('/search/:type', function(req, res, next) {
  var type = req.params.type;
  if (type === "star") {
    //this is where you would check the star model in the search algorithm
    Star.find({}, function(err, stars) {
      allResults = [];
      for (var i = 0; i < stars.length; i++) {
        var tmp = {};
        tmp.Title = stars[i].Title;
        tmp.Description = stars[i].Description;
        tmp.Url = "/stars/" + stars[i].id;
        allResults.push(tmp);
      }
      if (req.isAuthenticated()) {
        res.render('search', {title: 'Constellation - Search', query: req.body.search, extra: signedInHtml, results : allResults});
      } else {
        res.render('search', { title: 'Constellation - Search', query: req.body.search, extra: signedOutHtml, results : allResults});
      }
      });
      } else if (type === "constellation"){
      //this is where you would check the constellation model in the search algorithm
      if (req.isAuthenticated()) {
        res.render('search', {title: 'Constellation - Search', query: req.body.search, extra: signedInHtml, results : []});
      } else {
        res.render('search', { title: 'Constellation - Search',query: req.body.search, extra: signedOutHtml, results : []});
      }
    }
});

router.get('/search/:type', function(req, res, next) {
  var type = req.params.type;
  if (type === "star") {
    //this is where you would check the star model in the search algorithm
    Star.find({}, function(err, stars) {
      allResults = [];
      for (var i = 0; i < stars.length; i++) {
        var tmp = {}
        tmp.Title = stars[i].Title;
        tmp.Description = stars[i].Description;
        tmp.Url = "/stars/" + stars[i].id;
        allResults.push(tmp);
      }
      if (req.isAuthenticated()) {
        res.render('search', {title: 'Constellation - Search', query: req.body.search, extra: signedInHtml, results : allResults});
      } else {
        res.render('search', { title: 'Constellation - Search', query: req.body.search, extra: signedOutHtml, results : allResults});
      }
      });
      } else if (type === "constellation"){
      //this is where you would check the constellation model in the search algorithm
      if (req.isAuthenticated()) {
        res.render('search', {title: 'Constellation - Search', query: req.body.search, extra: signedInHtml, results : []});
      } else {
        res.render('search', { title: 'Constellation - Search',query: req.body.search, extra: signedOutHtml, results : []});
      }
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

router.get('/constellations/:ID', function(req, res, next) {
  //req.params are parameters you set in the routes
  var ID = req.params.ID;
  Constellation.findById(ID, function(err, constellation) {
    if (err) {res.redirect('back');console.log("is throwing error");}
    if (!star) {res.redirect('back');console.log("sorry not happening");} else {
      res.render('constellation', {title: 'Constellation - Browsing', Title: constellation.Title , Description: constellation.Description, Url: constellation.Url });
    }
  });
});

router.get('/stars/:ID', function(req, res, next) {
  var ID = req.params.ID;
  Star.findById(ID, function(err, star) {
    if (err) {res.redirect('back');console.log("is throwing error");}
    if (!star) {res.redirect('back');console.log("sorry not happening");} else {
      res.render('star', {title: 'Constellation - Browsing', Title: star.Title , Description: star.Description, Url: star.Url });
    }
  });
});

router.get('/profile', function(req, res, next){
  if(req.isAuthenticated()) {
    res.render('profile', {title:'Constellation - ' + req.user.Username, username : req.user.Username});
  } else {
    res.redirect('/search/star');
  }
});

//This route is perfectly fine, don't modify much, except maybe check for Authentication
router.get('/nebula/:type', function(req, res, next){
  var type = req.params.type;
  if (type === "star") {
    res.render('nebulaStar',{title:'Constellation - Nebula'});
  } else if ( type === "constellation") {
    res.render('nebulaConstellation',{title:'Constellation - Nebula'});
  } else {
    res.redirect('back');
  }
});

router.post('/nebula/:type', function(req, res, next){
  var type = req.params.type;
  if (type === "star") {
    var newStar = new Star();
    newStar.Title = req.body.Title;
    newStar.Description = req.body.Description;
    newStar.Url = req.body.Url;
    newStar.bookmarks = 0;

    newStar.save(function(err) {
    if (err) {
      console.log("error saving star");
      throw err;
    }
      console.log('New star created');
    });

    User.findByIdAndUpdate(
    req.user.id,
    {$push: {StarCreated: newStar.id}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    });
    res.redirect('/profile');
  } else if ( type === "constellation") {
    res.redirect('/profile');
  } else {
    res.redirect('back');
  }
});

router.get('/myConstellations', function(req, res, next){
  if (req.isAuthenticated()) {
    var created = req.user.ConstellationCreated;
    var allResults = [];
    for (var i = 0; i < created.length; i++) {
      Star.findById(created[i], function(err, constellation) {
        var tmp = {};
        tmp.Title = constellation.Title;
        tmp.Description = constellation.Description;
        tmp.Url = "/constellations/" + constellations.id;
        allResults.push(tmp);
      });
    }
    res.render('myConstellations',{title:'Constellation - Stars', results: allResults});
  } else {
    res.redirect('/');
  }
});

router.get('/myStars', function(req, res, next){
  if (req.isAuthenticated()) {
    var created = req.user.StarCreated;
    var allResults = [];
    for (var i = 0; i < created.length; i++) {
      Star.findById(created[i], function(err, star) {
        var tmp = {};
        tmp.Title = star.Title;
        tmp.Description = star.Description;
        tmp.Url = "/stars/" + star.id;
        allResults.push(tmp);
      });
    }
    res.render('myStars',{title:'Constellation - Stars', results: allResults});
  } else {
    res.redirect('/');
  }
});

router.get('/savedConstellations', function(req, res, next){
  if (req.isAuthenticated()) {
    var created = req.user.ConstellationFavorites;
    var allResults = [];
    for (var i = 0; i < created.length; i++) {
      Star.findById(created[i], function(err, constellation) {
        var tmp = {};
        tmp.Title = constellation.Title;
        tmp.Description = constellation.Description;
        tmp.Url = "/constellations/" + constellations.id;
        allResults.push(tmp);
      });
    }
    res.render('savedConstellations',{title:'Constellation - Stars', results: allResults});
  } else {
    res.redirect('/');
  }
});

router.get('/savedStars', function(req, res, next){
  if (req.isAuthenticated()) {
    var created = req.user.StarFavorites;
    var allResults = [];
    for (var i = 0; i < created.length; i++) {
      Star.findById(created[i], function(err, star) {
        var tmp = {};
        tmp.Title = star.Title;
        tmp.Description = star.Description;
        tmp.Url = "/stars/" + star.id;
        allResults.push(tmp);
      });
    }
    res.render('savedStars',{title:'Constellation - Stars', results: allResults});
  } else {
    res.redirect('/');
  }
});

router.post('/bookmarkStar', function(req,res, next) {
  console.log('bookmark request patched through');
  console.log("body: " + req.body.id);
  var ID = req.body.id;
  console.log("ID of current request: " + ID);
  console.log("ID of current user: " + req.user.id);
  User.findByIdAndUpdate(
  req.user.id,
  {$push: {StarFavorites: ID}},
  {safe: true, upsert: true},
  function(err, model) {
      console.log("Error updating bookmarks for " + model.Username + ": " + err);
  });
  console.log(req.user.StarFavorites);
});




module.exports = router;
