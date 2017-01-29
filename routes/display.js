var User = require('../models/user.js');

var signedInHtml = '<div class="formContainer"><button class="button" onclick="profileClicked()">Profile</button><button class="button" onclick="signOutClicked()">Sign Out</button></div>';
var signedOutHtml ='<div class="formContainer"><button class="button" onclick="signInClicked()">Sign In</button><button class="button" onclick="signUpClicked()">Sign Up</button></div>';
var myStarTopHtml = '<h2 class ="fill">My Stars</h2>';
var savedStarTopHtml = '<h2 class ="fill">Saved Stars</h2>';
var myStarExtraHtml = '<div class="formContainer"><button class="bigAssButton" onClick="nebulaStarClicked()">New Star</button></div>';
var myConstellationTopHtml = '<h2 class ="fill">My Constellations</h2>';
var savedConstellationTopHtml = '<h2 class ="fill">Saved Constellations</h2>';
var myConstellationExtraHtml = '<div class="formContainer"><button class="bigAssButton" onClick="nebulaConstellationClicked()">New Constellation</button></div>';

/* THIS FUNCTION CREATES BRANCHING LOGIC BY DECIDING WHETEHER OR NOT THE USER IS AUTHENTICATED */
exports.authenticate = function(req, res, AuthCallback, UnauthCallback, data) {
  if (req.isAuthenticated()) {
    AuthCallback(req, res, data);
  } else {
    UnauthCallback(req, res, data);
  }
}

/* EXTRA REQUEST HANDLER WHICH RESPONDS TO AJAX REQUEST AFTER PAGE LOADS */
exports.sendConstellation = function(req, res, data) {
    res.send({graph: data.Graph, stars: data.Stars});
}

/* THESE ARE THE ROUTINES WHICH RENDER THE VARIOUS PAGES*/
exports.IndexAuth = function(req, res, data) {
  res.render('index', {title: 'Constellation - ' + req.user.Username, extra: signedInHtml});
}
exports.IndexUnauth = function(req, res, data) {
  res.render('index', { title: 'Constellation - Welcome', extra: signedOutHtml});
}
exports.SearchAuth = function(req, res, data) {
  res.render('search', {title: 'Constellation - Search', query: req.body.search, extra: signedInHtml, results : data});
}
exports.SearchUnauth = function(req, res, data) {
  res.render('search', { title: 'Constellation - Search', query: req.body.search, extra: signedOutHtml, results : data});
}
exports.Constellation = function(req, res, constellation) {
  res.render('constellation', {title: 'Constellation - Browsing', Title: constellation.Title , Description: constellation.Description });
}
exports.Star = function(req, res, star) {
  res.render('star', {title: 'Constellation - Browsing', Title: star.Title , Description: star.Description, Url: star.Url });
}
exports.Profile = function(req, res, data) {
  res.render('profile', {title:'Constellation - ' + req.user.Username, username : req.user.Username});
}
exports.StarNebula = function(req, res, data) {
  res.render('nebulaStar',{title:'Constellation - Nebula'});
}
exports.ConstellationNebula = function(req, res, data) {
  res.render('nebulaConstellation',{title:'Constellation - Nebula'});
}
exports.back = function(req, res, data) {
  res.redirect('/');
}
exports.MyStars = function(req, res, data) {
  res.render('userStuff', {title:'Constellation - My Stars', top: myStarTopHtml, extra: myStarExtraHtml, results: data});
}
exports.MyConstellations = function(req, res, data) {
  res.render('userStuff', {title:'Constellation - My Constellations', top: myConstellationTopHtml, extra: myConstellationExtraHtml, results: data});
}
exports.SavedStars = function(req, res, data) {
  res.render('userStuff', {title:'Constellation - Saved Stars', top: savedStarTopHtml, results: data});
}
exports.SavedConstellations = function(req, res, data) {
  res.render('userStuff', {title:'Constellation - Saved Constellations', top: savedConstellationTopHtml, results: data});
}
exports.signIn = function(req, res, data) {
  res.render('signIn', {title: 'Constellation - Sign Up'});
}
exports.signUp = function(req, res, data) {
  res.render('signUp', { title: 'Constellation - Sign Up' });
}
exports.signUp2 = function(req, res, data) {
  res.render('signUp2', { title: 'Constellation - Sign Up' });
}
