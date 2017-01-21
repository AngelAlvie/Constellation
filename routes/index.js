var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Star = require('../models/star.js');
var Constellation = require('../models/constellation.js');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Constellation - Welcome' });
});
/* Perform a search -- implement search algorithm */
router.post('/search', function(req, res, next) {
  res.render('search', { title: 'Constellation - Search' });
});
/* sign in using passport */
router.post('/signIn', passport.authenticate('login', {
    successRedirect: '/search',
    failureRedirect: '/signIn',
    failureFlash : false
}));
/* GET the signin page */
router.get('/signIn',function(req, res, next) {
  res.render('signIn', {title: 'Constellation - Sign Up'});
});
/* sign up form */
router.post('/signUp', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signUp',
    failureFlash : false
  }));
/* GET sign up page */
router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'Constellation - Sign Up' });
});
/* GET sign up page part 2*/
router.post('/signUp2', function(req, res, next) {
  res.render('signUp2', { title: 'Constellation - Sign Up' });
});
/* GET sign up page 3*/
router.post('/signUp3', function(req, res, next) {
  res.render('signUp3', { title: 'Constellation - Sign Up' });
});
/* implement sign out*/
router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});
router.get('/constellation', function(req, res, next) {
  res.render('constellation', {title: 'Constellation - Browsing'});
});

router.get('/star', function(req, res, next) {
  res.render('star', {title: 'Constellation - Browsing'});
});

module.exports = router;
