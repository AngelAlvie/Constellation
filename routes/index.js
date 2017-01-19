var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Constellation' });
});

router.post('/search', function(req, res, next) {
  res.render('search', { title: 'Constellation' });
})

module.exports = router;
