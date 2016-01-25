var mongoose = require('mongoose');
var bluebird = require('bluebird');
bluebird.promisifyAll(mongoose);

var playlistSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  code: String,
  owner: String,
  queue: []
});

module.exports = mongoose.model('Playlist', playlistSchema);
