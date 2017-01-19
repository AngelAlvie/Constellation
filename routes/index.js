var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Constellation - Welcome' });
});

router.post('/search', function(req, res, next) {
  res.render('search', { title: 'Constellation - Search' });
});

router.get('/signIn', function(req, res, next) {
  res.render('signIn', { title: 'Constellation - Sign In' });
});

router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'Constellation - Sign Up' });
});
router.post('/signUp2', function(req, res, next) {
  res.render('signUp2', { title: 'Constellation - Sign Up' });
});
router.post('/signUp3', function(req, res, next) {
  res.render('signUp3', { title: 'Constellation - Sign Up' });
});
router.get('/constellation', function(req, res, next) {
  res.render('constellation', {title: 'Constellation - Browsing'});
});
router.get('/star', function(req, res, next) {
  res.render('star', {title: 'Constellation - Browsing'});
});

module.exports = router;
