var mongoose = require('mongoose');

// TODO: REMOVE ID and use the default MONGODB ID

var starSchema = mongoose.Schema({
  Title: String,
  Description: String,
  Url: String,
  Bookmarks : Number
});

var Star = mongoose.model('Star', starSchema);

module.exports = Star;
