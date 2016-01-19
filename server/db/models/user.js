var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
