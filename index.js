const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const {ObjectId} = require("mongodb");
const db = require('./database/connection');
const mongoose = require('mongoose');
const User = require('./database/users');
const Menu = require('./database/menu');


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

io.on('connection', function (socket) {

    console.log("Server: Connection has been made");

    // Login
    socket.on('logIn', function (data) {
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
                    User.find({email: data.email})
                        .then(function (result) {

                            if (result[0].name !== data.name) {
                                socket.emit('retrieveUserData', {
                                    user: {},
                                    status: false,
                                    message: 'User with this email already exists'
                                });
                            } else {
                                socket.emit('retrieveUserData', {
                                    user: result[0],
                                    status: true,
                                    message: 'You are now logging in'
                                });
                            }
                        })
                        .catch(function () {
                            user.save().then(function (findUser) {
                                console.log("A new user has been added to the database.");
                                socket.emit('retrieveUserData', {
                                    user: findUser,
                                    status: true,
                                    message: 'You have been registered'
                                })
                            }).catch(function (err) {
                                console.log(err.message);
                            });
                        })
                }


            })
            .catch(function (error) {
                socket.emit('retrieveUserData', {
                    user: {},
                    status: false,
                    message: 'Could not connect to the database'
                });
            });
    });

    // Get credits
    socket.on('getCredits', function (user) {
        db()
            .then(function () {
                User.findOneAndUpdate({_id: ObjectId(user._id)}, {$inc: {credits: 100}}, {new: true})
                    .then(function (result) {
                        socket.emit('retrieveCredits', result.credits);
                    })
                    .catch(err => console.log(err));
            })
    });

    // Get menu

    socket.on('getMenu', function () {
        db()
            .then(function () {
                Menu.find({}).then(function(menu) {
                    socket.emit('getMenu', menu);
                });
            })
    });
});