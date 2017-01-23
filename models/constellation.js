var mongoose = require('mongoose');

var constellationSchema = mongoose.Schema({
  Title: String,
  Description: String,
  Url: String,
  Bookmarks : Number,
  List: [Number]
});



var Constellation = mongoose.model('Constellation', constellationSchema);

module.exports = Constellation;
