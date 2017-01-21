/* This schema will change alot because it will need to store things in a connected graph structure instead of as a list, but you know what, it's a test object for now */

var mongoose = require('mongoose');

var constellationSchema = mongoose.Schema({
  Title: String,
  Description: String,
  List: [String]
});

var Constellation = mongoose.model('Constellation', constellationSchema);

module.exports = Constellation;
