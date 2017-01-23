var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  Email: String,
  Points: Number,
  StarFavorites: [String],
  ConstellationFavorites: [String],
  StarCreated: [String],
  ConstellationCreated: [String]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
