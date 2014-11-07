var db = require('../config/mongo_database');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
var redisClient = require('../config/redis_database').redisClient;
var tokenManager = require('../config/token_manager');

exports.login = function(req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';
    
    if (email == '' || password == '') { 
        return res.sendStatus(401); 
    }

    db.userModel.findOne({email: email}, function (err, user) {
        if (err) {
            console.log(err);
            return res.sendStatus(401);
        }

        if (user == undefined) {
            return res.sendStatus(401);
        }
        
        user.comparePassword(password, function(isMatch) {
            if (!isMatch) {
                console.log("Attempt failed to login with " + user.email);
                return res.sendStatus(401);
            }

            var token = jwt.sign({id: user._id}, secret.secretToken, { expiresInMinutes: tokenManager.TOKEN_EXPIRATION });
            
            return res.json({token:token});
        });

    });
};

exports.logout = function(req, res) {
    if (req.user) {
        tokenManager.expireToken(req.headers);

        delete req.user;    
        return res.sendStatus(200);
    }
    else {
        return res.sendStatus(401);
    }
}

exports.register = function(req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';
    var passwordConfirmation = req.body.passwordConfirmation || '';

    if (email == '' || password == '' || password != passwordConfirmation) {
        return res.sendStatus(400);
    }

    var user = new db.userModel();
    user.email = email;
    user.password = password;

    user.save(function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }  

        db.userModel.update({email:user.email}, function(err, nbRow) {
            console.log("User Created: " + user);
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            return res.sendStatus(200);
        });
    });
}