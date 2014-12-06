// server.js.

// Requires.
var express  = require('express'); // Express (expressjs.com).
var mongoose = require('mongoose'); // Mongoose for MongoDB (mongoosejs.com).
var bodyParser = require('body-parser'); // Easily parse a POST request.
var passport = require('passport'); // Passport for authentication (passportjs.org).
var LocalStrategy = require('passport-local').Strategy; // Local authentication.
var session = require('express-session'); // Simple session middleware for Express.

var Database = require('./database.js');

var movies = require("./movies.json");

(function () {
    Database.Movie.remove({}, function(err) {});

    for (var i = 0; i < movies.length; ++i) {
        var movie = new Database.Movie();
        movie.movieid = movies[i].movieid;
        movie.url = movies[i].url;
        movie.title = movies[i].title;
        movie.description = movies[i].description;

        movie.save(function(err) {
            if (err) {
                console.log("movie.save ERROR: " + err);
            }
        });
    }
    console.log("Successfully loaded movies database.");
}());

//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        Database.User.findOne({ email: email }, function (err, user) {
            if (err) { 
                return done(err); 
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            user.comparePassword(password, function(isMatch) {
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }); 
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Database.User.findById(id, function(err, user) {
        done(err, user);
    });
});

var auth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    }
    else {
        next();
    }
}
//==================================================================

var app = express(); // Express application.
var port = process.env.PORT || 8080; // Get the environment port or use 8080.

app.use(express.static(__dirname + '/../client/')); // Serve static files from here.
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL encoded bodies. Extended with qs module.
app.use(bodyParser.json()); // Parse JSON.
app.use(session({secret: 'xylotolh20$#@dd999100294ckfuad3', 
                 saveUninitialized: true,
                 resave: true}));
app.use(passport.initialize()); // Initialize Passport.
app.use(passport.session()); // Initialize Passport session.

// Start the server.
app.listen(port);
console.log('Server started on port: ' + port);

// Serve the application.
app.get('/', function(req, res) {
    res.sendFile('client/index.html', { 'root': '../' });
});

// API END-POINTS ==================================================

// Get all users: GET /api/v1/users/
app.get('/api/v1/users', auth, function(req, res) {
    Database.User.find(function(err, users) {
        if (err) {
            res.send(err);
        }

        res.json(users);
    });
});

// Get a user based on Mongo assigned ID: GET /api/v1/users/:user_id
app.get('/api/v1/users/:user_id', auth, function(req, res) {
    Database.User.findById(req.params.user_id, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

// Get a movie based on custom ID: GET /api/v1/movies?movieid=1
app.get('/api/v1/movies', auth, function(req, res) {
    Database.Movie.findOne({ movieid: req.query.movieid }, function(err, movie) {
        if (err) {
            res.send(err);
        }

        res.json(movie);
    });
});

//==================================================================

// Returns the user info if logged in and '0' otherwise.
app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

// Register a new user.
app.post('/register', function(req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';
    var passwordConfirmation = req.body.passwordConfirmation || '';

    if (email == '' || password == '' || password != passwordConfirmation) {
        return res.sendStatus(400);
    }

    var user = new Database.User();
    user.email = email;
    user.password = password;

    user.save(function(err) {
        if (err) {
            console.log("user.save ERROR: " + err);
            return res.sendStatus(500);
        }  
        return res.sendStatus(200);
    });
});

// Log a user in. Authenticate with passport locally.
app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});

// Log a user out.
app.post('/logout', function(req, res){
    req.logOut();
    res.sendStatus(200);
});