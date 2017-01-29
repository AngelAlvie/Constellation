var User = require('../models/user.js');
var Star = require('../models/star.js');
var Constellation = require('../models/constellation.js');

/* MAKE SURE THE USER EXISTS, THEN TEST IF THE THE REQUESTED ID IS IN THE USER'S LIST ALREADY */
function removeStar(req, res, user) {
  User.findByIdAndUpdate(
    user.id,
    {$pull: {StarFavorites: req.body.id}},
    {safe: true, upsert: true},
    function(err, model) {
      if (err) {
        console.log('Error removing bookmarks for ' + model.Username + ': ' + err);
        res.send("error removing favorites");
      } else if (!model){
        console.log('fail, model DNE');
        res.send("failure removing bookmark, user model DNE");
      } else {
        console.log('removed star');
        res.send("success removing bookmark");
      }
  });
}

function addStar(req, res, user) {
  User.findByIdAndUpdate(
    user.id,
    {$push: {StarFavorites: req.body.id}},
    {safe: true, upsert: true},
    function(err, model) {
      if (err) {
        console.log('Error removing bookmarks for ' + model.Username + ': ' + err);
        res.send("error adding bookmark");
      } else if (!model){
        console.log('fail model DNE');
        res.send("failure adding bookmark, user model DNE");
      } else {
        console.log('added star');
        res.send("success adding bookmark");
      }
  });
}

function removeConstellation(req, res, user) {
  User.findByIdAndUpdate(
    user.id,
    {$pull: {ConstellationFavorites: req.body.id}},
    {safe: true, upsert: true},
    function(err, model) {
      if (err) {
        console.log('Error removing bookmarks for ' + model.Username + ': ' + err);
        res.send("error removing favorites");
      } else if (!model){
        console.log('fail, model DNE');
        res.send("failure removing bookmark, user model DNE");
      } else {
        res.send("success removing bookmark");
      }
  });
}

function addConstellation(req, res, user) {
  User.findByIdAndUpdate(
    user.id,
    {$push: {ConstellationFavorites: req.body.id}},
    {safe: true, upsert: true},
    function(err, model) {
      if (err) {
        console.log('Error removing bookmarks for ' + model.Username + ': ' + err);
        res.send("error adding bookmark");
      } else if (!model) {
        console.log('fail model DNE');
        res.send("failure adding bookmark, user model DNE");
      } else {
        res.send("success adding bookmark");
      }
  });
}

function toggleConstellation(req, res, addCallback, removeCallback) {
  User.findById(req.user.id, function(err, item) {
    if (err) {
      console.log('database error trying to find user: ' + err);
      res.send("database error");
    } else if (!item) {
      console.log('could not find user in the database');
      res.send("retrieval error");
    } else {
      if (item.ConstellationFavorites.includes(req.body.id)) {
        removeCallback(req, res, item);
      } else {
        addCallback(req, res, item);
      }
    }
  });
}

function toggleStar(req, res, addCallback, removeCallback) {
  User.findById(req.user.id, function(err, item) {
    if (err) {
      console.log('database error trying to find user: ' + err);
      res.send("database error");
    } else if (!item) {
      console.log('could not find user in the database');
      res.send("retrieval error");
    } else {
      if (item.StarFavorites.includes(req.body.id)) {
        removeCallback(req, res, item);
      } else {
        addCallback(req, res, item);
      }
    }
  });
}

function exists(req, res, user) {
  res.send("bookmarked");
}
function doesNotExist(req, res, user) {
  res.send("does not exist");
}

exports.checkStar = function( req, res, data ) {
  toggleStar(req, res, doesNotExist, exists);
}
exports.checkConstellation = function( req, res, data ) {
  toggleConstellation(req, res, doesNotExist, exists);
}

exports.failed = function(req, res, data) {
  res.send("error not signed in");
};

exports.star = function(req, res, data) {
  toggleStar(req, res, addStar, removeStar);
}

exports.constellation = function(req, res, data) {
  toggleConstellation(req, res, addConstellation, removeConstellation);
}
