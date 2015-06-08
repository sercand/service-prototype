/**
 * Created by sercand on 09/06/15.
 */


"use strict";

var express = require('express');
var router = express.Router();
var Device = require('../models/device');

router.post('/', function (req, res, next) {

    var uuid = req.body.uuid;
    var model = req.body.model;

    var platform = req.body.platform;
    var os_version = req.body.os_version;
    var app_version = req.body.app_version;

    if (!uuid) {
        return next(new Error("UUID is missing"));
    }
    if (!model) {
        return next(new Error("Model is missing"));
    }
    if (!platform) {
        return next(new Error("Platform is missing"));
    }
    if (!os_version) {
        return next(new Error("Os Version is missing"));
    }
    if (!app_version) {
        return next(new Error("App Version is missing"));
    }
    var device = new Device(uuid, model, platform, os_version, app_version);

    device.save((err)=> {
        if (err) {
            return next(err);
        }
        return res.status(200).json({
            success: true,
            device_id: device._id
        });
    });
});

module.exports = router;
