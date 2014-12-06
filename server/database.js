var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var mongodbURL = 'mongodb://localhost/filmfest';
var SALT_WORK_FACTOR = 10;
var mongodbOptions = {};

mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
    if (err) { 
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + mongodbURL);
    }
});

var Schema = mongoose.Schema;

// User schema.
var User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

// Movie schema.
var Movie = new Schema({
    movieid: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String }
});

// Bcrypt middleware on UserSchema.
User.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

//Password verification
User.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(isMatch);
    });
};

// Export Models
var UserModel = mongoose.model('User', User);
var MovieModel = mongoose.model('Movie', Movie);

module.exports = {
    User: UserModel,
    Movie: MovieModel
};