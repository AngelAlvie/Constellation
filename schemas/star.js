var mongoose = require('mongoose');

var starSchema = mongoose.Schema({
  Title: String,
  Description: String,
  Url: String
});

var Star = mongoose.model('Star', starSchema);

module.exports = Star;
