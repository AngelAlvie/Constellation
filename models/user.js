/* This is a REALLY REALLY BAD SCHEMA RIGHT NOW, I want to use passport.js to handle security */

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  Email: String,
  StarFavorites: [String],
  ConstellationFavorites: [String],
  StarCreated: [String],
  ConstellationCreated: [String]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
