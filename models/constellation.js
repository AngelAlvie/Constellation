var mongoose = require('mongoose');

var constellationSchema = mongoose.Schema({
  Title: String,
  Description: String,
  Bookmarks : Number,
  Stars: [{Title : String, x: Number, y : Number, ID : String}],
  Graph: [[Number]]
});
var Constellation = mongoose.model('Constellation', constellationSchema);
module.exports = Constellation;
