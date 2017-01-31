var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Star = require('../models/star.js');
var Constellation = require('../models/constellation.js');
var passport = require('passport');
var display = require('./display.js');
var search = require('./search.js');
var bookmark = require('./bookmark.js');
var path = require('path');
/* GET INDEX PAGE */
router.get('/', function(req, res, next) {
  display.authenticate(req, res, display.IndexAuth, display.IndexUnauth, null);
});

/* POST SEARCH FOR STARS */
router.post('/search/star', function(req, res, next) {
  search.findAllByParameters(req, res, Star, req.body.search, 'render');
});
/* POST SEARCH FOR CONSTELLATIONS */
router.post('/search/constellation', function(req, res, next) {
  search.findAllByParameters(req, res, Constellation, req.body.search, 'render');
});
/* POST SEARCH FOR STARS WITHIN ANOTHER PAGE */
router.post('/search/stars', function(req,res,next) {
  console.log(req.body);
  search.findAllByParameters(req, res, Star, req.body.search, 'send');
});

/* POST SEARCH FOR CONSTELLATIONS WITHIN ANOTHER PAGE */
router.post('/search/constellations', function(req,res,next) {
  search.findAllByParameters(req, res, Constellation, req.body.search, 'send');
});
/* GET SEARCH METHOD FOR SEARCH REDIRECT */
router.get('/search/star', function(req, res, next) {
  search.findAllByParameters(req, res, Star, '', 'render');
});
/* GET SEARCH METHOD FOR SEARCH REDIRECT */
router.get('/search/constellation', function(req, res, next) {
  search.findAllByParameters(req, res, Constellation, '', 'render');
});

/* GET METHOD FOR VEIWING CONSTELATION PAGES*/
router.get('/constellations/:ID', function(req, res, next) {
  search.retrieveById(req, res, Constellation, req.params.ID, display.Constellation);
});

/* GET CONSTELLATIO DATA FOR AJAX REQUEST */
router.get('/constellationData/:ID', function(req, res, next) {
  search.retrieveById(req, res, Constellation, req.params.ID, display.sendConstellation);
});

/* GET METHOD FOR VIEWING STAR PAGES */
router.get('/stars/:ID', function(req, res, next) {
  search.starRetrieveById(req, res, Star, req.params.ID);
});

/* GET METHOD FOR VIEWING STAR PAGES */
router.get('/stars/:ID/send', function(req, res, next) {
  search.retrieveById(req, res, Star, req.params.ID, display.sendStar);
});

/* GET METHOD FOR VIEWING PROFILE PAGES */
router.get('/profile', function(req, res, next){
  display.authenticate(req, res, display.Profile, display.back, null);
});

/* GET METHOD FOR STAR EDITOR */
router.get('/nebula/star', function(req, res, next) {
  display.authenticate(req, res, display.StarNebula, display.back, null);
});

/* GET METHOD FOR CONSTELLATION EDITOR */
router.get('/nebula/constellation', function(req, res, next) {
  display.authenticate(req, res, display.ConstellationNebula, display.back, null);
});

/* POST METHOD TO SAVE STAR FROM EDITOR */
router.post('/nebula/star', function(req, res, next) {
  display.authenticate(req, res, search.saveStar, display.back, null);
});

/* POST METHOD TO SAVE CONSTELLATION FROM EDITOR*/
router.post('/nebula/constellation', function(req, res, next) {
  display.authenticate(req, res, search.saveConstellation, display.back, null);
});

/*GET METHOD FOR USERS STARS */
router.get('/myStars', function(req, res, next) {
  display.authenticate(req, res, search.getStar, display.back, 'myStars');
});

/* GET METHOD FOR USERS CONSTELLATIONS */
router.get('/myConstellations', function(req, res, next) {
  display.authenticate(req, res, search.getConstellation, display.back, 'myConstellations');
});

/*GET METHOD FOR USERS SAVED STARS */
router.get('/savedStars', function(req, res, next) {
  display.authenticate(req, res, search.getStar, display.back, 'savedStars');
});

/* GET METHOD FOR USERS SAVED CONSTELLATIONS */
router.get('/savedConstellations', function(req, res, next) {
  display.authenticate(req, res, search.getConstellation, display.back, 'savedConstellations');
});

/* POST METHOD TO HANDLE AJAX REQUEST FOR BOOKMARKING */
router.post('/bookmarkStar', function(req, res, next) {
   display.authenticate(req, res, bookmark.star, bookmark.failed, null);
});

/* POST METHOD TO HANDLE AJAX QUERY IF STAR BOOKMARKED*/
router.post('/isStarBookmarked', function(req, res, next) {
  display.authenticate(req, res, bookmark.checkStar, bookmark.failed, null);
});

/* POST METHOD TO HANDLE AJAX QUERY IF CONSTELLATION BOOKMARKED*/
router.post('/isConstellationBookmarked', function(req, res, next) {
  display.authenticate(req, res, bookmark.checkConstellation, bookmark.failed, null);
});

/* POST METHOD TO HANDLE AJAX REQUEST FOR BOOKMARKING */
router.post('/bookmarkConstellation', function(req, res, next) {
  display.authenticate(req, res, bookmark.constellation, bookmark.failed, null);
});

router.get('/deleteStar/:ID', function(req, res, next) {
  console.log("Begining process");
  display.authenticate(req, res, search.removeStar, bookmark.failed, req.params.ID);
});

router.get('/deleteConstellation/:ID', function(req, res, next) {
  display.authenticate(req, res, search.removeConstellation, bookmark.failed, req.params.ID);
});

/* POST SIGN IN REQUEST */
router.post('/signIn', passport.authenticate('signin', {
    successRedirect: '/',
    failureRedirect: '/signIn',
}));

//routing for the tutorial pages
router.get('/tutorial/constellation', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/constellation.html'));
});
router.get('/tutorial/nebulaConstellation', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/nebulaConstellation.html'));
});
router.get('/tutorial/nebulaStar', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/nebulaStar.html'));
});
router.get('/tutorial/search', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/search.html'));
});
router.get('/tutorial/star', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/star.html'));
});
router.get('/tutorial/tutStyle.css', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/tutStyle.css'));
});
router.get('/tutorial/NebStar1.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/NebStar1.PNG'));
});
router.get('/tutorial/NebStar2.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/NebStar2.PNG'));
});
router.get('/tutorial/NebStar3.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/NebStar3.PNG'));
});
router.get('/tutorial/Const1.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/Const1.PNG'));
});
router.get('/tutorial/Const2.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/Const2.PNG'));
});
router.get('/tutorial/NebConst1.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/NebConst1.PNG'));
});
router.get('/tutorial/NebConst2.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/NebConst2.PNG'));
});
router.get('/tutorial/NebConst3.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/NebConst3.PNG'));
});
router.get('/tutorial/NebConst4.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/NebConst4.PNG'));
});
router.get('/tutorial/NebConst5.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/NebConst5.PNG'));
});
router.get('/tutorial/NebConst6.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/NebConst6.PNG'));
});
router.get('/tutorial/Scope1.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/Scope1.PNG'));
});
router.get('/tutorial/Star2.PNG', function(req, res, next) {
  res.sendFile(path.resolve('../public/html/Star2.PNG'));
});

/* GET METHOD TO RETRIEVE SIGN IN PAGE */
router.get('/signIn',function(req, res, next) {
  display.authenticate(req, res, display.back, display.signIn);
});

/* POST SIGN UP REQUEST */
router.post('/signUp', passport.authenticate('signup', {
  successRedirect: '/signUp2',
  failureRedirect: '/signUp'
}));

/* GET REQUEST TO RETRIEVE */
router.get('/signUp', function(req, res, next) {
  display.authenticate(req, res, display.back, display.signUp);
});

/* GET REQUEST TO RETRIEVE */
router.get('/signUp2', function(req, res, next) {
  display.authenticate(req, res, display.signUp2, display.back);
});

/* GET SIGN OUT REQUEST */
router.get('/signOut', function(req, res) {
  req.logout();
  res.redirect('back');
});

// THIS MUST BE THE LAST LINE IN THIS CODE
module.exports = router;
