var mongoose = require('mongoose');

var constellationSchema = mongoose.Schema({
  Title: String,
  Description: String,
  Bookmarks : Number,
  Stars: [{String, Number, Number, String}],
  Graph: [[Number]]
});
var Constellation = mongoose.model('Constellation', constellationSchema);
module.exports = Constellation;
