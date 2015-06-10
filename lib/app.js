"use strict";

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var r_index = require('../routes/index');
var r_account = require('../routes/account');
var r_registerdevice = require('../routes/registerdevice');

var api_device = require('../routes/api/device');
var api_child = require('../routes/api/child');
var api_game = require('../routes/api/game');
var api_parent = require('../routes/api/parent');
var api_stat = require('../routes/api/stat');

var app = express();

// uncomment after placing your favicon in /public
app.use(logger('dev'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', r_index);
app.use('/account', r_account);
app.use('/registerdevice', r_registerdevice);

app.use('/api/v1/child', api_child);
app.use('/api/v1/device', api_device);
app.use('/api/v1/game', api_game);
app.use('/api/v1/parent', api_parent);
app.use('/api/v1/stat', api_stat);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


module.exports = app;
