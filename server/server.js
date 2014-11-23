// server.js.

// Requires.
var express  = require('express'); // Express (expressjs.com).
var mongoose = require('mongoose'); // Mongoose for MongoDB (mongoosejs.com).
var bodyParser = require('body-parser'); // Easily parse a POST request.
var passport = require('passport'); // Passport for authentication (passportjs.org).
var LocalStrategy = require('passport-local').Strategy; // Local authentication.
var session = require('express-session'); // Simple session middleware for Express.

var User = require('./database.js');

//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        User.findOne({ email: email }, function (err, user) {
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
    User.findById(id, function(err, user) {
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
app.use(passport.initialize());
app.use(passport.session());

// Start the server.
app.listen(port);
console.log('Sever started on port: ' + port);

// Serve the application.
app.get('/', function(req, res) {
    res.sendFile('client/index.html', { 'root': '../' });
});

app.get('/users', auth, function(req, res){
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        }

        res.json(users);
    });
});

app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/register', function(req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';
    var passwordConfirmation = req.body.passwordConfirmation || '';

    if (email == '' || password == '' || password != passwordConfirmation) {
        return res.sendStatus(400);
    }

    var user = new User();
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

app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});

app.post('/logout', function(req, res){
    req.logOut();
    res.sendStatus(200);
});