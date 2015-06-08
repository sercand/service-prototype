/**
 * Created by sercand on 09/06/15.
 */

"use strict";

var express = require('express');
var router = express.Router();
var Parent = require('../models/parent');
var hash = require('../lib/hash');
var validator = require('validator');
/* GET home page. */
router.post('/register', function (req, res, next) {

    var first = req.body.first_name;
    var second = req.body.last_name;

    var email = req.body.email;
    var password = req.body.password;

    if (!first || !second) {
        return next(new Error("User's name is missing"));
    }
    if (!email) {
        return next(new Error("User's email is missing"));
    }
    if (!validator.isEmail(email)) {
        return next(new Error("Email is invalid"));
    }
    if (!password) {
        return next(new Error("User's password is missing"));
    }
    if (password.length < 4) {
        return next(new Error("Password is short"));
    }

    var user = new Parent(first, second, email);

    function parentFounded(e_err, e_doc) {
        if (e_err) {
            return next(e_err);
        }
        if (e_doc) {
            return next(new Error("Email already registered"));
        }
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.json({
                success: true,
                user_id: user._id
            });
        });
    }

    hash.generateHash(password, (err, pw)=> {
        if (err) {
            return next(err);
        }
        user.password = pw;
        Parent.findByEmail(email, {fields: {_id: 1}}, parentFounded);
    });
});

router.post('/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email) {
        return next(new Error("User's email is missing"));
    }
    if (!password) {
        return next(new Error("User's password is missing"));
    }

    Parent.findByEmail(email, {}, function (err, doc) {
        if (err) {
            return next(err);
        }
        if (!doc) {
            return next(new Error("User not found"));
        }

        hash.validPassword(password, doc.password, (err2, valid)=> {
            if (err2) {
                return next(err2);
            }
            if (valid) {
                return res
                    .status(200)
                    .json({success: true, user_id: doc._id});
            } else {
                return next(new Error("Auth Error"));
            }
        });
    });
});


module.exports = router;
