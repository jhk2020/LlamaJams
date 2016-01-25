var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
bluebird.promisifyAll(mongoose);

var jwt = require('jsonwebtoken');
// var apiRoutes = require('./routes');
var config = require('./db/config');
var User= require('./db/models/user');
var Playlist = require('./db/models/playlist');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('../webpack.config.js');

var port = process.env.PORT || 5000;
mongoose.connect(config.database);
mongoose.connection.on('error', function(err) {
  console.error('Connection Error!', err);
});

var app = express();

/*-------------------------------- WEBPACK -----------------------------------*/

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

/*------------------------------- MIDDLEWARE ---------------------------------*/


app.set('secret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../public'));


/*--------------------------- UNPROTECTED ROUTES -----------------------------*/
app.post('/users', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (user) {
      res.status(400).send({error: 'Username already exists.'});
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      newUser.save(function(err) {
        if (err) {
          console.error('Error adding new user: ', err);
          return;
        }
        console.log('User saved successfully: ', newUser);
        var token = jwt.sign({username: newUser.username}, app.get('secret'), {
                      expiresIn: '1d'
                    });

        res.status(201).send({
          message: 'Enjoy your token!',
          token: token
        });
      });
    }
  });
});

/*---------------------------- API ROUTES -----------------------------------*/

var apiRoutes = express.Router();

apiRoutes.post('/authenticate', function(req, res) {
  console.log(req.body)
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      console.error('Error finding user: ', err);
    }
    if (!user) {
      res.status(401).send({error: 'User doesn`t exist.'});
    } else if (user) {
      if (user.password !== req.body.password) {
        res.status(401).send({error: 'Authentication failed. Wrong password.'});
      } else {
        var token = jwt.sign({username: user.username}, app.get('secret'), {
                      expiresIn: '1d'
                    });

        res.status(201).send({
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

apiRoutes.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, app.get('secret'), function(err, decoded) {
      if (err) {
        return res.status(401).send({error: 'Failed to authentiate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

apiRoutes.get('/users/playlist', function(req, res) {
  Playlist.find({owner: req.decoded.username}, 'title code', function(err, playlists) {
    if (err) {
      console.error('Error fetching playlist: ', err);
      return;
    }
    console.log('Fetching user playlists: ', playlists);


    res.status(200).send({
      message: 'Playlists found!',
      playlists: playlists
    })
  })
})

apiRoutes.post('/users/playlist', function(req, res) {
  var playlistCode = Math.random().toString(36).substr(2,5);
  var newPlaylist = new Playlist({
    title: req.body.data,
    code: playlistCode,
    owner: req.decoded.username
  });
  newPlaylist.save(function(err) {
    if (err) {
      console.error('Error adding new user: ', err);
      return;
    }
    console.log('New playlist saved successfully: ', newPlaylist);

    res.status(201).send({
      message: 'Playlist saved!',
      newPlaylist: newPlaylist
    });
  });
});

apiRoutes.get('/playlist', function(req, res) {
  console.log('body data: ', req.query.code)
  Playlist.findOneAsync({ code: req.query.code })
    .then(function(playlist) {
      console.log('Found playlist: ', playlist);
      res.status(200).send({
        message: 'Playlist found!',
        queue: playlist.queue
      })
    })
    .catch(function(err) {
      console.error('Error finding playlist: ', err);
    })
});


apiRoutes.post('/playlist', function(req, res) {
  Playlist.findOneAndUpdateAsync({ code: req.body.data.code }, { queue: req.body.data.queue })
    .then(function(numbersAffected) {
      res.status(201).send({
        message: 'Playlist saved!'
      })
    })
    .catch(function(err) {
      console.error('Error saving playlist: ', err);
      res.status(400).send({error: 'Playlist not saved'})
    })
});

app.use('/api', apiRoutes);

app.listen(port, function() {
  console.log('Listening to 5000...');
});
