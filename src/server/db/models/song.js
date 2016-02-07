var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  soundCloudId: String,
  title: String,
  user: String,
  artwork_url: String,
  playlistCode: String,
  vote: Number
});
