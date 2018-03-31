const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const {ObjectId} = require("mongodb");
const db = require('./database/connection');
const User = require('./database/users');

const app = express();
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();

const server = app.listen(port);
const io = socket(server);

// Middleware

app.use(express.static('public'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Socket

io.on('connection', function(socket) {

    console.log("Server: Connection has been made");

    socket.on('logIn', function(data) {
        db()
            .then(function () {
                const user = new User({
                    name: data.name,
                    email: data.email,
                    credits: 100
                });

                if (data.name === undefined || data.email === undefined) {
                    socket.emit('retrieveUserData', {status: false, message: 'Incorrect name or email'});
                } else {
                    User.find({name: data.name, email: data.email})
                        .then(function (result) {
                            if (result.length === 0) {
                                user.save().then(function () {
                                    console.log("A new user has been added to the database.");
                                    socket.emit('retrieveUserData', {user: result, status: true, message: 'You have been registered'})
                                }).catch(function (err) {
                                    console.log(err.message);
                                });
                            } else {
                                socket.emit('retrieveUserData', {user: result[0], status: true, message: 'You are now logging in'});
                            }
                        });
                }


            })
            .catch(function (error) {
                console.log(error.message);
            });
    })
});