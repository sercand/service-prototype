/**
 * Created by sercand on 08/06/15.
 */

'use strict';
var mongoClient = require('mongodb').MongoClient;
var async = require('async');

/**
 * the database Object
 * @type {Object}
 */
var database = {
    mongo: null,
    connect: connect,
    close: close,
    collection: getCollection,
    init: init,
    options: {
        collections: ['parent', 'child', 'device', 'game']
    }
};

/**
 * Get MongoDB collection
 * @param {string} collName
 * @param {callback} cb
 */
function getCollection(collName, cb) {
    database.mongo.collection(collName, {strict: true}, function (err, col1) {
        if (err) {
            database.mongo.createCollection(collName, function (err2, col2) {
                if (err2) {
                    return cb(undefined);
                }
                return cb(col2);
            });
        } else {
            cb(col1);
        }
    });
}

/**
 * Connect to MongoDB
 * @param url The URL
 * @returns {Promise}
 */
function connect(url) {

    var promise = function (resolve, reject) {
        mongoClient.connect(url, function (err, db) {
            database.mongo = db;
            if (err) {
                console.error('db connect: connection refused');
                reject(err);
            } else {
                console.log('db connect: connected to DB');
                resolve(db);
            }
        });
    };

    return new Promise(promise);
}


/**
 * Initializes MongoDB
 * @returns {Promise}
 */
function init() {
    function createOrGetCollection(colName, done) {
        getCollection(colName, function (coll) {
            if (coll) {
                return done(null, {
                    key: colName,
                    col: coll
                });
            } else {
                return done('not found ' + colName, coll);
            }
        });
    }

    return new Promise(function (resolve, reject) {
        async.map(database.options.collections, createOrGetCollection, function (err, results) {
            if (err) {
                return reject('initializing db is failed');
            }

            for (var result of results) {
                console.log('db[' + result.key + '] founded');
                database[result.key] = result.col;
            }
            return resolve(null);
        });
    });
}

/**
 * Closes mongodb connections
 * @method close
 */
function close() {
    if (typeof database.mongo !== 'undefined' && database.mongo !== null) {
        database.mongo.close();
    }
}


module.exports = database;