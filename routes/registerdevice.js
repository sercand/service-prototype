/**
 * Created by sercand on 09/06/15.
 */


"use strict";

var express = require('express');
var router = express.Router();
var Device = require('../models/device');

router.post('/', function (req, res, next) {

    let uuid = req.body.uuid;
    let model = req.body.model;

    let platform = req.body.platform;
    let os_version = req.body.os_version;
    let app_version = req.body.app_version;

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
    let device = new Device(uuid, model, platform, os_version, app_version);

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
