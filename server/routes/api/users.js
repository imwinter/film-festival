var User = require('./../../models/user.js');
var passport = require('./../../auth/passport.js');

module.exports = function(express, app) {
    var router = express.Router();

    router.route('/users')
        .get(function(req, res) { // GET http://localhost:8080/api/users
            User.find(function(err, users) {
                if (err) {
                    res.send(err);
                }

                res.json(users);
            });
        });

    router.route('/users/:user_id')
        .get(passport.auth, function(req, res) { // GET http://localhost:8080/api/users/:user_id
            User.findById(req.params.user_id, function(err, user) {
                if (err) {
                    res.send(err);
                }

                res.json(user);
            });
        })
        .delete(function(req, res) { // DELETE http://localhost:8080/api/users/:user_id
            User.remove({
                _id: req.params.user_id
            }, function(err, user) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'User deleted.' });
            });
        });

    app.use('/api', router); // Routes prefixed with /api.
}