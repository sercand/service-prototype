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

var app = express();

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', r_index);
app.use('/account', r_account);
app.use('/registerdevice', r_registerdevice);

app.use('/api/v1/child', api_child);
app.use('/api/v1/device', api_device);
app.use('/api/v1/game', api_game);
app.use('/api/v1/parent', api_parent);

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
