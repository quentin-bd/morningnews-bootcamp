var mongoose = require('mongoose');
const uid2 = require('uid2');

var userSchema = mongoose.Schema({
    login: String,
    email: String,
    password: String,
    token: String,
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;