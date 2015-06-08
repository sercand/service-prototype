/**
 * Created by sercand on 09/06/15.
 */

"use strict";

var bcrypt = require('bcrypt');

module.exports.generateHash = function (password, done) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(password, salt, done);
    });
};

module.exports.validPassword = function (password, hash, done) {
    return bcrypt.compare(password, hash, done);
};