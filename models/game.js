/**
 * Created by sercand on 09/06/15.
 */

"use strict";

var ObjectID = require('mongodb').ObjectID;
var db = require('../lib/db');


export class Build {
    constructor(version, url, news) {
        this.version = version;
        this.download = url;
        this.whatsnew = news;
    }
}

export class Game {

    constructor(owner, name) {
        let o_id = owner;
        if (typeof id === 'string') {
            o_id = new ObjectID(owner);
        }
        this._id = new ObjectID();
        this.owner = o_id;
        this.name = name;
        this.keywords = [];
        this.website = "";
        this.description = "";
        this.licence = "";
        this.builds = [];
        this.logo = "";
        this.images = [];
    }

    save(cb) {
        db.game.insert(this, cb);
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
        db.game.findOne({_id: _id}, opt, function (err, doc) {
            if (err) {
                return done(err);
            } else {
                return done(null, doc);
            }
        });
    }

    static updateById(id, data, cb) {
        var _id = id;
        if (typeof id === 'string') {
            _id = new ObjectID(id);
        }
        return db.game.update({_id: _id}, data, cb);
    }

}