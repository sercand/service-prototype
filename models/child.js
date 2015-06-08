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
}