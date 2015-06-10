/**
 * Created by sercand on 10/06/15.
 */
"use strict";

var io;
var Stat = require('../models/stat');

function onConnection(socket) {

    socket.on('disconnect', function () {
        let d = new Date();
        let t = d.getTime() - socket.session_start_time.getTime();
        let stat = new Stat(socket.parent_id, null, t, Stat.Events.SessionEnded);
        stat.save();

        if (socket.last_game != null) {
            var t2 = (new Date()).getTime() - socket.last_game.time.getTime();
            let stat2 = new Stat(socket.parent_id, socket.last_game.id, t2, Stat.Events.GameEnded);
            stat2.save();
            delete socket.last_game;
        }
    });

    socket.on("init", function (data) {
        console.log("Client Connected");

        socket.parent_id = data.parent_id;
        socket.session_start_time = new Date();
        let stat = new Stat(socket.parent_id, null, 1, Stat.Events.SessionStarted);
        stat.save();
    });

    socket.on('answer:correct', function (data) {
        let stat = new Stat(socket.parent_id, data.game_id, 1, Stat.Events.CorrectAnswer);
        stat.save();
    });
    socket.on('answer:wrong', function (data) {
        let stat = new Stat(socket.parent_id, data.game_id, 1, Stat.Events.WrongAnswer);
        stat.save();
    });
    socket.on('game:start', function (data) {
        let stat = new Stat(socket.parent_id, data.game_id, 1, Stat.Events.GameStarted);
        socket.last_game = {
            id: data.game_id,
            time: stat.date
        };
        stat.save();
    });
    socket.on('game:end', function (data) {
        if (socket.last_game != null && socket.last_game.id === data.game_id) {
            var t = (new Date()).getTime() - socket.last_game.time.getTime();
            let stat = new Stat(socket.parent_id, data.game_id, t, Stat.Events.GameEnded);
            stat.save();
            delete socket.last_game;
        } else {
            let stat = new Stat(socket.parent_id, data.game_id, 0, Stat.Events.GameEnded);
            stat.save();
        }
    });
}


module.exports = function (server) {
    io = require('socket.io')(server, {serveClient: false});

    io.on('connection', onConnection);
};