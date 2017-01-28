var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Star = require('../models/star.js');
var Constellation = require('../models/constellation.js');
var passport = require('passport');
var signedInHtml = '<div class="formContainer"><button class="button" onclick="profileClicked()">Profile</button><button class="button" onclick="signOutClicked()">Sign Out</button></div>';
var signedOutHtml ='<div class="formContainer"><button class="button" onclick="signInClicked()">Sign In</button><button class="button" onclick="signUpClicked()">Sign Up</button></div>';
var myStarTopHtml = '<h2 class ="fill">My Stars</h2>';
var savedStarTopHtml = '<h2 class ="fill">Saved Stars</h2>';
var myStarExtraHtml = '<div class="formContainer"><button class="bigAssButton" onClick="nebulaStarClicked()">New Star</button></div>';
var myConstellationTopHtml = '<h2 class ="fill">My Constellations</h2>';
var savedConstellationTopHtml = '<h2 class ="fill">Saved Constellations</h2>';
var myConstellationExtraHtml = '<div class="formContainer"><button class="bigAssButton" onClick="nebulaConstellationClicked()">New Constellation</button></div>';

/* THIS FUNCTION IS AN ENDPOINT, SO NEXT ISN'T EXPECTED */
function authenticate(req, res, AuthCallback, UnauthCallback, data) {
  if (req.isAuthenticated()) {
    AuthCallback(req, res, data);
  } else {
    UnauthCallback(req, res, data);
  }
}
/* THIS FUNCTION WILL PERFORM A SEARCH GIVEN A COLLECTION AND PARAMETERS */
function findAllByParameters(req, res, collection, query, method) {
  collection.find(query, function (err, results) {
    if (err) {
      console.log("error occured while searching for stars " + err);
      res.redirect('/');
    } else {
      compileResults(req, res, results, method);
    }
  });
}
/* THIS FUNCTION COMPILES THE RESULTS INTO SOMETHING WHICH CAN BE PARSED BY HANDLEBARS */
function compileResults(req, res, results, method) {
  var allResults = [];
  for (var i = 0; i < results.length; i++) {
    var tmp = {};
    tmp.Title = results[i].Title;
    tmp.Description = results[i].Description;
    tmp.Url = '/stars/' + results[i].id;
    allResults.push(tmp);
  }
  if (method === 'render') {
    authenticate(req, res, displaySearchAuth, displaySearchUnauth, allResults);
  } else if (method === 'send') {
    res.send(allResults);
  }
}
/* GIVEN A COLLECTION AND AN ID, THIS METHOD WILL FIND ANY DOCUMENTS MATCHING THE ID AND PASS THAT DATA TO THE GIVEN CALLBACK */
function retrieveById(req, res, collection, id, callback) {
  collection.findById(id, function(err, result) {
    if (err) {
      console.log('database error finding by ID ' + err);
      res.redirect('back');
    }
    if (!result) {
      console.log("could not find by ID: " + ID);
      res.redirect('back');
    } else {
      callback(req, res, result);
    }
  });
}

function saveStar(req, res, data) {
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
      saveToUser(req, res, {StarCreated: newStar.id});
    }
  });
}

function saveConstellation(req, res, data) {
  var newConstellation = new Constellation();
  newConstellation.Title = req.body.Title;
  newConstellation.Description = req.body.Description;
  newConstellation.Bookmarks = 0;
  newConstellation.Stars = req.body.Stars;
  newConstellation.Graph = req.body.Graph;
  newConstellation.save(function(err) {
  if (err) {
    console.log('error saving constellation');
    throw err;
  } else {
    console.log('New constellation created');
    saveToUser(req, res, {ConstellationCreated: newConstellation.id});
  }
  });
}

function saveToUser(req, res, data) {
  User.findByIdAndUpdate(
    req.user.id,
    {$push: data},
    {safe: true, upsert: true},
    function(err, model) {
      if (err) {
        console.log('Error saving to user ' + req.user.Username + ': ' + err);
      } else {
        res.redirect('/profile');
      }
    }
  );
}
function requests(req, res, callback, total) {
  this.req = req;
  this.res = res;
  this.callback = callback;
  this.data = [];
  this.total = total;
  this.add = function(item) {
    this.data.push(item);
    this.check();
  }
  this.check = function() {
    if (this.data.length >= this.total) {
        this.callback(this.req, this.res, this.data);
    }
  }
}

function getStar(req, res, data) {
  var iterator;
  var asynch;
  if (data === 'myStars') {
    iterator = req.user.StarCreated;
    asynch = new requests(req, res, displayMyStars, iterator.length);
  } else if (data === 'savedStars') {
    iterator = req.user.StarFavorites;
    asynch = new requests(req, res, displaySavedStars, iterator.length);
  }
  if (asynch.total === 0) {
    asynch.check();
  } else {
    for (var i = 0; i < iterator.length; i++) {
      Star.findById(iterator[i], function(err, star) {
        if (err) {
          asynch.total--;
          asynch.check();
        } else if (!star) {
          asynch.total--;
          asynch.check();
        } else {
          var tmp = {};
          tmp.Title = star.Title;
          tmp.Description = star.Description;
          tmp.Url = "/stars/" + star.id;
          asynch.add(tmp);
        }
      });
    }
  }
}

function getConstellation(req, res, data) {
  var iterator;
  var asynch;
  if (data === 'myConstellations') {
    iterator = req.user.ConstellationCreated;
    asynch = new requests(req, res, displayMyConstellations, iterator.length);
  } else if (data === 'savedConstellations') {
    iterator = req.user.ConstellationFavorites;
    asynch = new requests(req, res, displaySavedConstellations, iterator.length);
  }
  if (asynch.total === 0) {
    asynch.check();
  } else {
    for (var i = 0; i < iterator.length; i++) {
      Constellation.findById(iterator[i], function(err, constellation) {
        if (err) {
          asynch.total--;
          asynch.check();
        } else if (!star) {
          asynch.total--;
          asynch.check();
        } else {
          var tmp = {};
          tmp.Title = constellation.Title;
          tmp.Description = constellation.Description;
          tmp.Url = "/constellations/" + constellation.id;
          asynch.add(tmp);
        }
      });
    }
  }
}

function sendConstellation(req, res, data) {
    res.send({graph: data.Graph, stars: data.Stars});
}

function displayIndexAuth(req, res, data) {
  res.render('index', {title: 'Constellation - ' + req.user.Username, extra: signedInHtml});
}
function displayIndexUnauth(req, res, data) {
  res.render('index', { title: 'Constellation - Welcome', extra: signedOutHtml});
}
function displaySearchAuth(req, res, data) {
  res.render('search', {title: 'Constellation - Search', query: req.body.search, extra: signedInHtml, results : data});
}
function displaySearchUnauth(req, res, data) {
  res.render('search', { title: 'Constellation - Search', query: req.body.search, extra: signedOutHtml, results : data});
}
function displayConstellation(req, res, constellation) {
  res.render('constellation', {title: 'Constellation - Browsing', Title: constellation.Title , Description: constellation.Description });
}
function displayStar(req, res, star) {
  res.render('star', {title: 'Constellation - Browsing', Title: star.Title , Description: star.Description, Url: star.Url });
}
function displayProfile(req, res, data) {
  res.render('profile', {title:'Constellation - ' + req.user.Username, username : req.user.Username});
}
function displayStarNebula(req, res, data) {
  res.render('nebulaStar',{title:'Constellation - Nebula'});
}
function displayConstellationNebula(req, res, data) {
  res.render('nebulaConstellation',{title:'Constellation - Nebula'});
}
function back(req, res, data) {
  res.redirect('back');
}
function displayMyStars(req, res, data) {
  res.render('userStuff', {title:'Constellation - My Stars', top: myStarTopHtml, extra: myStarExtraHtml, results: data});
}
function displayMyConstellations(req, res, data) {
  res.render('userStuff', {title:'Constellation - My Constellations', top: myConstellationTopHtml, extra: myConstellationExtraHtml, results: data});
}
function displaySavedStars(req, res, data) {
  res.render('userStuff', {title:'Constellation - Saved Stars', top: savedStarTopHtml, results: data});
}
function displaySavedConstellations(req, res, data) {
  res.render('userStuff', {title:'Constellation - Saved Constellations', top: savedConstellationTopHtml, results: data});
}
/* GET INDEX PAGE */
router.get('/', function(req, res, next) {
  authenticate(req, res, displayIndexAuth, displayIndexUnauth, null);
});

/* POST SEARCH FOR STARS */
router.post('/search/star', function(req, res, next) {
  findAllByParameters(req, res, Star, {}, 'render');
});
/* POST SEARCH FOR CONSTELLATIONS */
router.post('/search/constellation', function(req, res, next) {
  findAllByParameters(req, res, Constellation, {}, 'render');
});
/* POST SEARCH FOR STARS WITHIN ANOTHER PAGE */
router.post('/search/stars', function(req,res,next) {
  findAllByParameters(req, res, Star, {}, 'send');
});

/* GET SEARCH METHOD FOR SEARCH REDIRECT */
router.get('/search/star', function(req, res, next) {
  findAllByParameters(req, res, Star, {}, 'render');
});
/* GET SEARCH METHOD FOR SEARCH REDIRECT */
router.get('/search/constellation', function(req, res, next) {
  findAllByParameters(req, res, Constellation, {}, 'render');
});

/* GET METHOD FOR VEIWING CONSTELATION PAGES*/
router.get('/constellations/:ID', function(req, res, next) {
  retrieveById(req, res, Constellation, req.params.ID, displayConstellation);
});

/* GET CONSTELLATIO DATA FOR AJAX REQUEST */
router.get('/constellationData/:ID', function(req, res, next) {
  retrieveById(req, res, Constellation, req.params.ID, sendConstellation);
});

/* GET METHOD FOR VIEWING STAR PAGES */
router.get('/stars/:ID', function(req, res, next) {
  retrieveById(req, res, Star, req.params.ID, displayStar);
});

/* GET METHOD FOR VIEWING PROFILE PAGES */
router.get('/profile', function(req, res, next){
  authenticate(req, res, displayProfile, back, null);
});

/* GET METHOD FOR STAR EDITOR */
router.get('/nebula/star', function(req, res, next) {
  authenticate(req, res, displayStarNebula, back, null);
});

/* GET METHOD FOR CONSTELLATION EDITOR */
router.get('/nebula/constellation', function(req, res, next) {
  authenticate(req, res, displayConstellationNebula, back, null);
});

/* POST METHOD TO SAVE STAR FROM EDITOR */
router.post('/nebula/star', function(req, res, next) {
  authenticate(req, res, saveStar, back, null);
});

/* POST METHOD TO SAVE CONSTELLATION FROM EDITOR*/
router.post('/nebula/constellation', function(req, res, next) {
  authenticate(req, res, saveConstellation, back, null);
});

/*GET METHOD FOR USERS STARS */
router.get('/myStars', function(req, res, next) {
  authenticate(req, res, getStar, back, 'myStars');
});

/* GET METHOD FOR USERS CONSTELLATIONS */
router.get('/myConstellations', function(req, res, next) {
  authenticate(req, res, getConstellation, back, 'myConstellations');
});

/*GET METHOD FOR USERS SAVED STARS */
router.get('/savedStars', function(req, res, next) {
  authenticate(req, res, getStar, back, 'savedStars');
});

/* GET METHOD FOR USERS SAVED CONSTELLATIONS */
router.get('/savedConstellations', function(req, res, next) {
  authenticate(req, res, getConstellation, back, 'savedConstellations');
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



/* AUTHENTICATION USING PASSPORT, ALL THE CODE BELOW SHOULD BE LARGELY UNTOUCHED */

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

// THIS MUST BE THE LAST LINE IN THIS CODE
module.exports = router;
