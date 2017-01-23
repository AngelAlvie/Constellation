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
