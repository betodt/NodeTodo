// node modules
var express = require('express');
var app = express();
var mongoose = require('mongoose');

// local requires
var config = require('./config');
var mainController = require('./controllers/mainController.js');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');
var userController = require('./controllers/userController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.use('/deps', express.static(__dirname + '/node_modules'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());

mainController(app);
setupController(app);
apiController(app);
userController(app);

app.listen(port);