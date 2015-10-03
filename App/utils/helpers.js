var Firebase = require('firebase');
var FirebaseTokenGenerator = require('firebase-token-generator');
var Promise = require('bluebird');
var Fireproof = require('fireproof');
    Fireproof.bless(Promise);

// create reference to database
var ref = new Firebase('https://llamajamsauth.firebaseio.com/')
// 'promisable' reference
var fpRef = new Fireproof(ref);

// use database secret for token generator
var tokenGenerator = new FirebaseTokenGenerator('VgF8MXKNUfEnzygDAERDZdiLPUS86W4AGBHmEYM8');


module.exports = {
 
  // OLD HOST
  authHost: function(token) {
    console.log('SUBMITTED HOST TOKEN:', token);
    // AUTHENTICATE WITH TOKEN
    return fpRef.authWithCustomToken(token);
  },

  // NEW HOST
  createPlaylist: function(firstName) {
    // create PLAYLIST CODE
    var playlistCode = firstName + Math.floor(Math.random()*100);
    console.log("PLAYLIST CODE CREATED:", playlistCode);

    // create TOKEN

		var token = tokenGenerator.createToken({"uid": "asfass23j4io32e23in", "playlistCode": playlistCode, "isOwner": true});
		console.log('HOST TOKEN CREATED:', token);

		window.localStorage.setItem('token', token);

		var refactored = {
			token: token,
			playlist: 'playlist',
			playlistCode: playlistCode
		};
		
		var playlistRef = new Firebase("https://llamajamsauth.firebaseio.com/" + playlistCode);

		return playlistCode;
	}

    // set the refactored data in database
    playlistRef.set(refactored);

    return playlistCode;
	},

  checkCode: function(code) {
    console.log('inside checkcode:', code)
    return fpRef.once('value');
  }
}

