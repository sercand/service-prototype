/**
 * Created by sercand on 09/06/15.
 */

"use strict";

var ObjectID = require('mongodb').ObjectID;
var db = require('../lib/db');


export class Builds {
    constructor(version, url, news) {
        this.version = version;
        this.download = url;
        this.whatsnew = news;
    }
}

export class Game {

    constructor(owner, name) {
        this._id = new ObjectID();
        this.owner = owner;
        this.name = name;
        this.keywords = [];
        this.website = "";
        this.description = "";
        this.licence = "";
        this.builds = [];
        this.images = {
            icon: "",
            logo: "",
            screenshots: []
        };
    }

    save(cb) {
        db.game.insert(this, cb);
    }
}