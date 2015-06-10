/**
 * Created by sercand on 08/06/15.
 */
"use strict";

var ObjectID = require('mongodb').ObjectID;
var db = require('../lib/db');


export default class Child {
    constructor(name, parentId) {
        this._id = new ObjectID();
        this.name = name;
        this.parent_id = parentId;
        this.games = [];
    }

    save(cb) {
        db.child.insert(this, cb);
    }

    setParentId(id) {
        var _id = id;
        if (typeof id === 'string') {
            _id = new ObjectID(id);
        }
        this.parent_id = _id;
    }

    static findById(id, opt, done) {
        if (typeof done === 'undefined') {
            done = opt;
            opt = {};
        }

        var _id = id;
        if (typeof id === 'string') {
            _id = new ObjectID(id);
        }
        db.child.findOne({_id: _id}, opt, function (err, doc) {
            if (err) {
                return done(err);
            } else {
                return done(null, doc);
            }
        });
    }

    static findByParentId(id, opt, done) {
        if (typeof done === 'undefined') {
            done = opt;
            opt = {};
        }

        var _id = id;
        if (typeof id === 'string') {
            _id = new ObjectID(id);
        }
        db.child.find({parent_id: _id}, opt).toArray(function (err, docs) {
            if (err) {
                return done(err);
            } else {
                return done(null, docs);
            }
        });
    }

    static update(query, opt, cb) {
        db.child.update(query, opt, cb);
    }
}