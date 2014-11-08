// server.js.

// Requires.
var express  = require('express'); // Express (expressjs.com).
var mongoose = require('mongoose'); // Mongoose for MongoDB (mongoosejs.com).
var bodyParser = require('body-parser'); // Easily parse a POST request.
var jwt = require('express-jwt'); // JSON web tokens for Express.
var secret = require('./config/secret'); // API secret.

var app = express(); // Express application.
var port = process.env.PORT || 8080; // Get the environment port or use 8080.

app.use(express.static(__dirname + '/../client/')); // Serve static files from here.
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL encoded bodies. Extended with qs module.
app.use(bodyParser.json()); // Parse JSON.

//Routes.
var routes = {};
routes.users = require('./routes/users.js');

// Start the server.
app.listen(port);
console.log('Sever started on port: ' + port);

// Serve the application.
app.get('/', function(req, res) {
    res.sendFile('client/index.html', { 'root': '../' });
});

// Create a new user.
app.post('/user/register', routes.users.register);

// Login.
app.post('/user/login', routes.users.login);

// Logout.
app.get('/user/logout', jwt({secret: secret.secretToken}), routes.users.logout);