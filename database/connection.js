const mongoose = require('mongoose');

let uri = "mongodb://michaeladze:1256330_Mongo@ds125195.mlab.com:25195/heroku_xbfdqzgp";
let lhuri = "mongodb://localhost/dronecafe";

function db() {
    return new Promise(function(resolve, reject) {

        mongoose.connect(uri);

        mongoose.connection.once('open', function() {
            resolve("Connection has been made.");
        });

        mongoose.connection.on('error', function(error) {
            reject("Connection error: " + error.message);
        })
    })
}

module.exports = db;