const mongoose = require('mongoose');

function db() {
    return new Promise(function(resolve, reject) {

        mongoose.connect("mongodb://localhost/dronecafe");

        mongoose.connection.once('open', function() {
            resolve("Connection has been made.");
        });

        mongoose.connection.on('error', function(error) {
            reject("Connection error: " + error.message);
        })
    })
}

module.exports = db;