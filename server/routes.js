var express = require('express');
var User = require('./db/models/user');
var jwt = require('jsonwebtoken');

var apiRoutes = express.Router();

apiRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    username: req.body.user.username
  }, function(err, user) {
    if (err) {
      console.error('Error finding user: ', err);
    }
    console.log(user);
    if (!user) {
      res.json({success: false, message: 'Authentication failed. User not found.'});
    } else if (user) {
      if (user.password !== req.body.user.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.'});
      } else {
        var token = jwt.sign({username: user.username}, app.get('superSecret'), {
          expiresInMinutes: 1440
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

module.exports = apiRoutes;
