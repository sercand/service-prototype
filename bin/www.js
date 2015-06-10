#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */

var db = require('../lib/db');
var cfenv = require("cfenv");
var http = require('http');
var appEnv = cfenv.getAppEnv();

console.log(appEnv.bind, appEnv.port);
console.log(appEnv.getServiceURL("mongodb0"));
var app, io, server;

function start() {
    return new Promise(function (resolve) {
        app = require('../lib/app');
        server = http.createServer(app);
        io = require('../lib/io')(server);

        server.listen(appEnv.port, "0.0.0.0", function () {
            console.log("server starting on " + appEnv.url);
            resolve();
        });
    });

}

let mongo_url = appEnv.getServiceURL("mongodb0") || "mongodb://localhost:27017/Otsimo";

db.connect(mongo_url)
    .then(db.init)
    .then(start)
    .then(function () {             // All gone well log it
        console.log('Server has started');
    })
    .catch(function (error) {       //Something went wrong log it
        console.log('initialize' + error.stack);
        throw error;
    });