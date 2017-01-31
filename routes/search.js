var display = require('./display.js');
var User = require('../models/user.js');
var Star = require('../models/star.js');
var Constellation = require('../models/constellation.js');

function saveToUser(req, res, data) {
  User.findByIdAndUpdate(
    req.user.id,
    {$push: data},
    {safe: true, upsert: true},
    function(err, model) {
      if (err) {
        console.log('Error saving to user ' + req.user.Username + ': ' + err);
        res.redirect('/profile');
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

/* THIS FUNCTION COMPILES THE RESULTS INTO SOMETHING WHICH CAN BE PARSED BY HANDLEBARS */
function compileResults(req, res, results, method, query, collection) {
  if (query === undefined) {
    query = " ";
  }
  var queryArray = query.split(" ");
  var allResults = [];
    for (var j = 0; j < results.length; j++) {
      for (var i = 0; i < queryArray.length; i++) {
        if (results[j].Title.toLowerCase().includes(queryArray[i].toLowerCase()) || results[j].Description.toLowerCase().includes(queryArray[i].toLowerCase())) {
          var tmp = {};
          tmp.Title = results[j].Title;
          tmp.Description = results[j].Description;
          if (collection === Star) {
            tmp.Url = '/stars/' + results[j].id;
          } else if (collection === Constellation) {
            tmp.Url = '/constellations/' + results[j].id;
          }
          allResults.push(tmp);
          break;
        }
      }
    }
  if (method === 'render') {
    display.authenticate(req, res, display.SearchAuth, display.SearchUnauth, allResults);
  } else if (method === 'send') {
    res.send(allResults);
  }
}

/* THIS FUNCTION WILL PERFORM A SEARCH GIVEN A COLLECTION AND PARAMETERS */
exports.findAllByParameters = function(req, res, collection, query, method) {
  collection.find({}).sort({Bookmarks : 'descending'}).exec( function (err, output) {
    if (err) {
      console.log("error occured while searching for stars " + err);
      res.redirect('/');
    } else {
      console.log(output);
      compileResults(req, res, output, method, query, collection);
    }
  });
}

/* GIVEN A COLLECTION AND AN ID, THIS METHOD WILL FIND ANY DOCUMENTS MATCHING THE ID AND PASS THAT DATA TO THE GIVEN CALLBACK */
exports.starRetrieveById = function(req, res, collection, id) {
  collection.findById(id, function(err, result) {
    if (err) {
      console.log('database error finding by ID ' + err);
      res.redirect('back');
    } else if (!result) {
      console.log("could not find by ID: " + id);
      res.redirect('back');
    } else {
      display.authenticate(req, res, display.StarAuth, display.StarUnauth, result);
    }
  });
}
exports.retrieveById = function(req, res, collection, id, callback) {
  collection.findById(id, function(err, result) {
    if (err) {
      console.log('database error finding by ID ' + err);
      res.redirect('back');
    } else if (!result) {
      console.log("could not find by ID: " + id);
      res.redirect('back');
    } else {
      callback(req, res, result);

    }
  });
}


exports.saveStar = function(req, res, data) {
  var newStar = new Star();
  newStar.Title = req.body.Title;
  newStar.Description = req.body.Description;
  newStar.Url = req.body.Url;
  newStar.Bookmarks = 0;
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

exports.saveConstellation = function(req, res, data) {
  var newConstellation = new Constellation();
  newConstellation.Title = req.body.Title;
  newConstellation.Description = req.body.Description;
  newConstellation.Bookmarks = 0;
  newConstellation.Stars = req.body.Stars;
  console.log("Current req.body.Stars" );
  console.log(req.body.Stars);
  console.log("Current new constellation Stars");
  console.log(req.body.Stars);
  newConstellation.Graph = req.body.Graph;
  newConstellation.save(function(err) {
  if (err) {
    console.log('error saving constellation');
    throw err;
  } else {
    console.log('New constellation created');
    console.log(" New constellation that was saved:" + newConstellation);
    saveToUser(req, res, {ConstellationCreated: newConstellation.id});
  }
  });
}

exports.getStar = function(req, res, data) {
  var iterator;
  var asynch;
  if (data === 'myStars') {
    iterator = req.user.StarCreated;
    asynch = new requests(req, res, display.MyStars, iterator.length);
  } else if (data === 'savedStars') {
    iterator = req.user.StarFavorites;
    asynch = new requests(req, res, display.SavedStars, iterator.length);
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

exports.getConstellation = function(req, res, data) {
  var iterator;
  var asynch;
  if (data === 'myConstellations') {
    iterator = req.user.ConstellationCreated;
    asynch = new requests(req, res, display.MyConstellations, iterator.length);
  } else if (data === 'savedConstellations') {
    iterator = req.user.ConstellationFavorites;
    asynch = new requests(req, res, display.SavedConstellations, iterator.length);
  }
  if (asynch.total === 0) {
    asynch.check();
  } else {
    for (var i = 0; i < iterator.length; i++) {
      Constellation.findById(iterator[i], function(err, constellation) {
        if (err) {
          asynch.total--;
          asynch.check();
        } else if (!constellation) {
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
