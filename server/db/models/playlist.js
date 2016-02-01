var mongoose = require('mongoose');
var bluebird = require('bluebird');
bluebird.promisifyAll(mongoose);
var Song = require('./song');

var playlistSchema = new mongoose.Schema({
  title: String,
  code: String,
  owner: String,
  queue: [Song]
});

module.exports = mongoose.model('Playlist', playlistSchema);
