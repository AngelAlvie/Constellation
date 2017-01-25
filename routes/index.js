var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Star = require('../models/star.js');
var Constellation = require('../models/constellation.js');
var passport = require('passport');

// CENTRALIZED TASKLIST
// TODO: [FIXED] (CURRENT) call update to update the reference to the bookmark
// TODO: Clean up code and comments
// TODO: Cleanup console.log() statements and add them where appropriate (severside events and errors)
// TODO: make use of middleware (next) and error handling
// TODO: [FIXED](THAD) add optional message area for Handlebars to pages where errors might occur.
// TODO: populate mesage area on error
// TODO: (THAD) make the description input element a textbox (Don't worry about this until later)
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
// TODO: [FIXED] (THAD) make the profileFill ID a class instead of an ID
// TODO: [FIXED] (THAD) Add imput boxes (title, etc) to constellatio editor
// TODO: [FIXED] (THAD) Add save button to constel, editor
// TODO: figure out why the telescope on the nebula editor doesn't WORK
// TODO: implement save functionality for Constellation
// TODO make search and view work for constellations
// TODO: Fix background image on Mozarella Firefox
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
// Using Jquery

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
  if (type === 'star') {
    //this is where you would check the star model in the search algorithm
    Star.find({}, function(err, stars) {
      allResults = [];
      for (var i = 0; i < stars.length; i++) {
        var tmp = {};
        tmp.Title = stars[i].Title;
        tmp.Description = stars[i].Description;
        tmp.Url = '/stars/' + stars[i].id;
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
  } else if (type === 'stars') {
    //this is where you would check the star model in the search algorithm
    Star.find({}, function(err, stars) {
      allResults = [];
      for (var i = 0; i < stars.length; i++) {
        var tmp = {};
        tmp.Title = stars[i].Title;
        tmp.Description = stars[i].Description;
        tmp.Url = '/stars/' + stars[i].id;
        allResults.push(tmp);
      }
      if (req.isAuthenticated()) {
        res.send(allResults);
      } else {
        res.send(allResults);
      }
      });
  }
});

router.get('/search/:type', function(req, res, next) {
  var type = req.params.type;
  if (type === 'star') {
    //this is where you would check the star model in the search algorithm
    Star.find({}, function(err, stars) {
      allResults = [];
      for (var i = 0; i < stars.length; i++) {
        var tmp = {}
        tmp.Title = stars[i].Title;
        tmp.Description = stars[i].Description;
        tmp.Url = '/stars/' + stars[i].id;
        allResults.push(tmp);
      }
      if (req.isAuthenticated()) {
        res.render('search', {title: 'Constellation - Search', query: req.body.search, extra: signedInHtml, results : allResults});
      } else {
        res.render('search', { title: 'Constellation - Search', query: req.body.search, extra: signedOutHtml, results : allResults});
      }
      });
    } else if (type === 'constellation'){
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
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signIn', {title: 'Constellation - Sign Up'});
  }
});

/* sign up form */
router.post('/signUp', passport.authenticate('signup', {
    successRedirect: '/signUp2',
    failureRedirect: '/signUp'
  }));
/* GET sign up page */
router.get('/signUp', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signUp', { title: 'Constellation - Sign Up' });
  }
});
/* GET sign up page 2*/
router.get('/signUp2', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('signUp2', { title: 'Constellation - Sign Up' });
  } else {
    res.redirect('signUp');
  }
});

/* implement sign out*/
router.get('/signOut', function(req, res) {
  req.logout();
  res.redirect('back');
});


//authentication doesn't matter here b/c anyone can view the individual star/ constellation pages
router.get('/constellations/:ID', function(req, res, next) {
  var ID = req.params.ID;
  Constellation.findById(ID, function(err, constellation) {
    if (err) {
      res.redirect('back');
      console.log('database error finding constellation');
    }
    if (!constellation) {
      res.redirect('back');
      console.log("could not find constellation by ID: " + ID);
    } else {
      res.render('constellation', {title: 'Constellation - Browsing', Title: constellation.Title , Description: constellation.Description, Url: constellation.Url });
    }
  });
});

router.get('/stars/:ID', function(req, res, next) {
  var ID = req.params.ID;
  Star.findById(ID, function(err, star) {
    if (err) {
      res.redirect('back');
      console.log('database error finding star');
    }
    if (!star) {
      res.redirect('back');
      console.log('could not find star by ID: ' + ID);
    } else {
      res.render('star', {title: 'Constellation - Browsing', Title: star.Title , Description: star.Description, Url: star.Url });
    }
  });
});

// user must be autheticated for this to work
/* profile page, currently its a menu */
router.get('/profile', function(req, res, next){
  if(req.isAuthenticated()) {
    res.render('profile', {title:'Constellation - ' + req.user.Username, username : req.user.Username});
  } else {
    res.redirect('back');
  }
});

//nebula is the star and constellation editor, should be accessable only if signed in
router.get('/nebula/:type', function(req, res, next){
  if (req.isAuthenticated()) {
    var type = req.params.type;
    if (type === "star") {
      res.render('nebulaStar',{title:'Constellation - Nebula'});
    } else if ( type === 'constellation') {
      res.render('nebulaConstellation',{title:'Constellation - Nebula'});
    } else {
      res.redirect('back');
    }
  } else {
    res.redirect('back');
  }
});
//handles saving stuff user submits to nebula
router.post('/nebula/:type', function(req, res, next){
  if (req.isAuthenticated()) {
    var type = req.params.type;
    if (type === "star") {
      var newStar = new Star();
      newStar.Title = req.body.Title;
      newStar.Description = req.body.Description;
      newStar.Url = req.body.Url;
      newStar.bookmarks = 0;
      newStar.save(function(err) {
        if (err) {
          console.log('error saving star');
          throw err;
        } else {
          console.log('New star created');
        }
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
      var newConstellation = new Constellation();
      newConstellation.Title = req.body.Title;
      newConstellation.Description = req.body.Description;
      newConstellation.Bookmarks = 0;
      newConstellation.Stars = req.body.Stars;
      newConstellation.Graph = req.body.Graph;
      newStar.save(function(err) {
      if (err) {
        console.log('error saving constellation');
        throw err;
      } else {
        console.log('New constellation created');
      }
      });
      User.findByIdAndUpdate(
      req.user.id,
      {$push: {ConstellationCreated: newConstellation.id}},
      {safe: true, upsert: true},
      function(err, model) {
        console.log(err);
      });
      res.redirect('/profile');
    } else {
      res.redirect('back');
    }
  } else {
    res.redirect('/');
  }
});

/* Render the constellations a user has created */
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

/* Render the stars a user has created */
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

/* Render all the constellations a user has created */
router.get('/savedConstellations', function(req, res, next){
  if (req.isAuthenticated()) {
    var bookmarks = req.user.ConstellationFavorites;
    var allResults = [];
    for (var i = 0; i < created.length; i++) {
      Star.findById(bookmarks[i], function(err, constellation) {
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

/* Render all the star pages a user has created */
router.get('/savedStars', function(req, res, next){
  if (req.isAuthenticated()) {
    var bookmarks = req.user.StarFavorites;
    var allResults = [];
    for (var i = 0; i < created.length; i++) {
      Star.findById(bookmarks[i], function(err, star) {
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

/* AJAX request to bookmark a star, only possible if user is signed in */
router.post('/bookmarkStar', function(req,res, next) {
  if (req.isAuthenticated()) {
    var ID = req.body.id;
    User.findById(req.user.id, function(err, user) {
      if (err) {
        console.log('database error trying to find user while bookmarking');
      }
      if (!user) {
        console.log('could not find user while bookmarking');
      } else {
        if (user.StarFavorites.includes(ID)) {
          // if already bookmarked, then remove from bookmarks
          User.findByIdAndUpdate(
            req.user.id,
            {$pull: {StarFavorites: ID}},
            {safe: true, upsert: true},
            function(err, model) {
            console.log('Error removing bookmarks for ' + model.Username + ': ' + err);
          });
        } else {
          // if not already bookmarked, then add to working list of bookmarks
          User.findByIdAndUpdate(
            req.user.id,
            {$push: {StarFavorites: ID}},
            {safe: true, upsert: true},
            function(err, model) {
            console.log('Error adding bookmarks for ' + model.Username + ': ' + err);
          });
        }
      }
    });
  } else {
    res.redirect('/');
  }
});

/* AJAX request to bookmark a constellation, only possible if user is signed in */
router.post('/bookmarkConstellation', function(req,res, next) {
  if (req.isAuthenticated()) {
    var ID = req.body.id;
    User.findById(req.user.id, function(err, user) {
      if (err) {
        console.log('database error trying to find user while bookmarking');
      }
      if (!user) {
        console.log('could not find user while bookmarking');
      } else {
        if (user.ConstellationFavorites.includes(ID)) {
          // if already bookmarked, then remove from bookmarks
          User.findByIdAndUpdate(
            req.user.id,
            {$pull: {ConstellationFavorites: ID}},
            {safe: true, upsert: true},
            function(err, model) {
            console.log('Error removing bookmarks for ' + model.Username + ': ' + err);
          });
        } else {
          // if not already bookmarked, then add to working list of bookmarks
          User.findByIdAndUpdate(
            req.user.id,
            {$push: {ConstellationFavorites: ID}},
            {safe: true, upsert: true},
            function(err, model) {
            console.log('Error adding bookmarks for ' + model.Username + ': ' + err);
          });
        }
      }
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
