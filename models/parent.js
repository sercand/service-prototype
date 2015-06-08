/**
 * Created by sercand on 08/06/15.
 */
"use strict";

var ObjectID = require('mongodb').ObjectID;
var db = require('../lib/db');

export default class User {
    constructor(firstName, lastName, email) {
        this._id = new ObjectID();
        this.first_name = firstName;
        this.last_name = lastName;
        this.name = firstName + ' ' + lastName;
        this.email = email;
        this.password = '';
        this.registered_at = new Date();
    }

    save(done) {
        db.parent.insert(this, done);
    }

    static findByEmail(email, opt, done) {
        if (typeof done === 'undefined') {
            done = opt;
            opt = {};
        }

        db.parent.findOne({email: email}, opt, function (err, doc) {
            if (err) {
                return done(err);
            } else {
                return done(null, doc);
            }
        });
    }
}