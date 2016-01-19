var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../../public'));
app.use('/assets', express.static(__dirname + '/../assets'));
app.use('/bower_components', express.static(__dirname + '/../../bower_components'));

app.listen(5000, function() {
  console.log('Listening to 5000...');
})
