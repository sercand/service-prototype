/**
 * Created by sercand on 10/06/15.
 */

"use strict";

var ObjectID = require('mongodb').ObjectID;
var db = require('../lib/db');


class Stat {
    constructor(parent_id, game_id, value, eventType) {
        this._id = new ObjectID();
        this.parent_id = new ObjectID(parent_id);
        this.game_id = (game_id ? new ObjectID(game_id) : null);
        this.value = value;
        this.date = new Date();
        this.event = eventType;
    }

    save(cb) {
        db.stat.insert(this, cb);
    }

    static aggregate(query, cb) {
        db.stat.aggregate(query).toArray(cb);
    }
}


module.exports = Stat;
module.exports.Events = {
    GameStarted: 0,
    GameEnded: 1,
    CorrectAnswer: 2,
    WrongAnswer: 3,
    SessionStarted: 4,
    SessionEnded: 5
};