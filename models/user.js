/* This is a REALLY REALLY BAD SCHEMA RIGHT NOW, I want to use passport.js to handle security */

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  Email: String,
  Points: Number,
  StarFavorites: [Number],
  ConstellationFavorites: [Number],
  StarCreated: [Number],
  ConstellationCreated: [Number]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
