var passport = require('./../../auth/passport.js');
var User = require('./../../models/user.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile('client/index.html', { 'root': '../' });
    });

    app.put('/register', function(req, res) {
        var user = new User(); // Create a new user instance.
        user.email = req.body.email; // Set the users email.
        user.password = req.body.password; // Set the users password.

        user.save(function(err) { // Save the new user.
            if (err) {
                res.send(err);
            }

            res.json({ message: 'User created.' });
        });
    });

    app.get('/loggedin', function(req, res) { 
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/login', passport.authenticate('local'), function(req, res) { 
        res.send(req.user);
    });

    app.post('/logout', function(req, res){ 
        req.logOut(); 
        res.sendStatus(200);
    });
}