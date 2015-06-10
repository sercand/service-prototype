/**
 * Created by sercand on 10/06/15.
 */



"use strict";

var express = require('express');
var router = express.Router();
var Stat = require('../../models/stat');
var ObjectID = require('mongodb').ObjectID;
var validator = require('validator');


function AllAnswers(req, res, next) {
    let parent_id = req.params.id;

    if (!validator.isMongoId(parent_id)) {
        return next(new Error("Invalid Parent ID"));
    }

    var pid = new ObjectID(parent_id);
    Stat.aggregate([
        {$match: {parent_id: pid, event: {$in: [Stat.Events.CorrectAnswer, Stat.Events.WrongAnswer]}}},
        {$group: {_id: "$event", value: {$sum: "$value"}}}], function (err, docs) {
        if (err) {
            return next(err);
        }
        res.status(200).json({success: true, data: docs});
    });
}

function AnswersByGame(req, res, next) {
    let parent_id = req.params.id;
    let game_id = req.params.game_id;

    if (!validator.isMongoId(parent_id)) {
        return next(new Error("Invalid Parent ID"));
    }

    if (!validator.isMongoId(game_id)) {
        return next(new Error("Invalid Game ID"));
    }

    var pid = new ObjectID(parent_id);
    var gid = new ObjectID(game_id);

    Stat.aggregate([
        {$match: {parent_id: pid, game_id: gid, event: {$in: [Stat.Events.CorrectAnswer, Stat.Events.WrongAnswer]}}},
        {$group: {_id: "$event", value: {$sum: "$value"}}}], function (err, docs) {
        if (err) {
            return next(err);
        }
        res.status(200).json({success: true, data: docs});
    });
}

function PlayTime(req, res, next) {
    let parent_id = req.params.id;

    if (!validator.isMongoId(parent_id)) {
        return next(new Error("Invalid Parent ID"));
    }

    var pid = new ObjectID(parent_id);
    Stat.aggregate([
        {$match: {parent_id: pid, event: Stat.Events.GameEnded}},
        {$project: {event: "$event", value: "$value", hour: {$hour: "$date"}}},
        {$group: {_id: {time: "$hour"}, value: {$sum: "$value"}}}], function (err, docs) {
        if (err) {
            return next(err);
        }
        res.status(200).json({success: true, data: docs});
    });
}

function PlayTimeByGame(req, res, next) {
    let parent_id = req.params.id;
    let game_id = req.params.game_id;

    if (!validator.isMongoId(parent_id)) {
        return next(new Error("Invalid Parent ID"));
    }
    if (!validator.isMongoId(game_id)) {
        return next(new Error("Invalid Game ID"));
    }

    var pid = new ObjectID(parent_id);
    var gid = new ObjectID(game_id);

    Stat.aggregate([
        {$match: {parent_id: pid, game_id: gid, event: Stat.Events.GameEnded}},
        {$project: {event: "$event", value: "$value", hour: {$hour: "$date"}}},
        {$group: {_id: {time: "$hour"}, value: {$sum: "$value"}}}], function (err, docs) {
        if (err) {
            return next(err);
        }
        res.status(200).json({success: true, data: docs});
    });
}

router.get('/allanswers/:id', AllAnswers);

router.get('/allanswers/:id/:game_id', AnswersByGame);

router.get('/playtime/:id', PlayTime);

router.get('/playtime/:id/:game_id', PlayTimeByGame);

module.exports = router;
