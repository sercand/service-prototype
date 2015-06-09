/**
 * Created by sercand on 09/06/15.
 */


"use strict";

var express = require('express');
var router = express.Router();
var validator = require('validator');
var Game = require('../../models/game').Game;
var Build = require('../../models/game').Build;

router.get('/:id', function (req, res, next) {
    let game_id = req.params.id;

    if (!validator.isMongoId(game_id)) {
        return next(new Error("Invalid Game ID"));
    }

    Game.findById(game_id, (err, doc)=> {
        if (err) {
            return next(err);
        }
        if (!doc) {
            return next(new Error('Game not found'));
        }
        return res.status(200).json({
            success: true,
            data: doc
        });
    });
});

router.get('/:id/getsettings', function (req, res, next) {
    res.send("there is nothing to see here!");
});

router.post('/create', function (req, res, next) {
    let name = req.body.name;
    let owner = req.body.owner;

    if (!name) {
        return next(new Error("Name of the game is missing"));
    }
    if (!owner) {
        return next(new Error("Owner ID is missing"));
    }
    if (!validator.isMongoId(owner)) {
        return next(new Error("Invalid Owner ID"));
    }
    let game = new Game(owner, name);

    game.save((err)=> {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            success: true,
            game_id: game._id
        });
    });
});

function getValidUpdateData(data) {
    if (data._id) {
        delete data._id;
    }
    if (data.builds) {
        delete data.builds;
    }

    return {
        $set: data
    };
}

router.post('/:id/update', function (req, res, next) {
    let game_id = req.params.id;

    if (!validator.isMongoId(game_id)) {
        return next(new Error("Invalid Game ID"));
    }

    Game.findById(game_id, (err, doc)=> {
        if (err) {
            return next(err);
        }
        if (!doc) {
            return next(new Error('Game not found'));
        }
        let data = getValidUpdateData(req.body);
        if (!data) {
            return next(new Error('Invalid Update Data'));
        } else {
            return Game.updateById(game_id, data, (err2)=> {
                if (err2) {
                    return next(err2);
                } else {
                    return res.status(200).json({
                        success: true
                    });
                }
            });
        }
    });
});

module.exports = router;
