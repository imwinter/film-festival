// user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', User);