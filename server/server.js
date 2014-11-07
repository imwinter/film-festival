// server.js.

// Requires.
var express  = require('express'); // Express (expressjs.com).
var mongoose = require('mongoose'); // Mongoose for MongoDB (mongoosejs.com).
var bodyParser = require('body-parser'); // Easily parse a POST request.
var cookieParser = require('cookie-parser'); // Cookie parsing middleware.
var session = require('express-session'); // Session middleware for Express.
var passport = require('./auth/passport.js'); // Passport authentication.

var app = express(); // Express application.
var port = process.env.PORT || 8080; // Get the environment port or use 8080.

// General configurations.
mongoose.connect('mongodb://localhost/filmfest'); // Connect Mongoose to MongoDB 'filmfest' database.

app.use(express.static(__dirname + '/../client/')); // Serve static files from here.
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL encoded bodies. Extended with qs module.
app.use(bodyParser.json()); // Parse JSON.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(session({ secret: '545c37fb897982b312aa6026', resave: true, saveUninitialized: true })); // Setup session store with the given options.

passport.init(app); // Initialize passport.

require('./routes/app/pages.js')(app); // Application routing.

require('./routes/api/users.js')(express, app); // Users API routing.

// Start the server.
app.listen(port);
console.log('Sever started on port: ' + port);