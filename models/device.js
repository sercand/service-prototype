/**
 * Created by sercand on 08/06/15.
 */

"use strict";

var ObjectID = require('mongodb').ObjectID;
var db = require('../lib/db');

export default class Device {
    /**
     * New Device
     * @param {String} uuid Device uuid
     * @param {String} model Device model
     * @param {String} platform OS name
     * @param {string} version OS version
     * @param {string} app App Version
     */
    constructor(uuid, model, platform, version, app) {
        this._id = new ObjectID();
        this.model = model;
        this.platform = platform;
        this.uuid = uuid;
        this.os_version = version;
        this.app_version = app;
    }

    save(cb) {
        db.device.insert(this, cb);
    }
}
