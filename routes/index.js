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
// TODO: create form filter function which prevents XSS
// TODO: create routes for individual star pages
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

var signedInHtml = '<div class="formContainer"><button class="button" onclick="profileClicked()">Profile</button><button class="button" onclick="signOutClicked()">Sign Out</button></div>';
var signedOutHtml ='<div class="formContainer"><button class="button" onclick="signInClicked()">Sign In</button><button class="button" onclick="signUpClicked()">Sign Up</button></div>';
var testResult = {Title:"Test Result Please Ignore", Description:"Test description please ignore. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", Url:"/star/100"};


var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

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
      //this is where you would check the star model in the search algorithm
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
      //this is where you would check the star model in the search algorithm
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

router.get('/constellation/:ID', function(req, res, next) {
  //req.params are parameters you set in the routes
  var ID = req.params.ID;
  Constellation.findOne({'id' : ID}, function(err, constellation) {
    if (err) {
      console.log("error finding constellation with ID: " + ID);
      res.render('constellation', {title: 'Constellation ' + req.params.ID});
    } else {
      if (!constellation) {
          console.log("could not find constellation with ID: " + ID);
          res.render('constellation', {title: 'Constellation ' + req.params.ID});
      } else {
        console.log("found constellation with ID: " + ID);
        res.render('constellation', {title: 'Constellation ' + req.params.ID});
      }
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
  if(req.isAuthenticated) {
    res.render('profile', {title:'Constellation - ' + req.user.Username, username : req.user.Username});
  } else {
    res.redirect('/search/star');
  }
});

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

    User.findOne({Username : req.user.Username}, function(err, DBuser) {
      DBuser.StarCreated.push(newStar.id);
    });
    res.redirect('/profile');
  } else if ( type === "constellation") {
    res.redirect('/profile');
  } else {
    res.redirect('back');
  }
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
