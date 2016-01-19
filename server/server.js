var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
// var apiRoutes = require('./routes');
var config = require('./db/config')
var User= require('./db/models/user')

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
  var newUser = new User({
    username: req.body.user.username,
    password: req.body.user.password
  });
  newUser.save(function(err) {
    if (err) {
      console.error('Error adding new user: ', err);
      return;
    }
    console.log('User saved successfully: ', newUser);
    res.sendStatus(200);
  })
});

/*---------------------------- API ROUTES -----------------------------------*/

var apiRoutes = express.Router();

apiRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    username: req.body.user.username
  }, function(err, user) {
    if (err) {
      console.error('Error finding user: ', err);
    }
    if (!user) {
      res.status(401).send({error: 'User doesn`t exist.'});
    } else if (user) {
      if (user.password !== req.body.user.password) {
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
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
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

app.use('/api', apiRoutes);


app.listen(port, function() {
  console.log('Listening to 5000...');
});
