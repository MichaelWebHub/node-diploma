const express = require('express');
const bodyParser = require('body-parser');
const io = require('socket.io');
const {ObjectId} = require("mongodb");
const db = require('./database/connection');
const User = require('./database/users');

const app = express();
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();

app.listen(port);

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Creating new user or Logging in

app.get('/test', function(req, res) {
    res.end('test');
});

app.post('/login', jsonParser, function(req, res) {
    console.log(req.body.name, req.body.email);

    db()
        .then(function() {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                credits: 100
            });

            User.find({email: req.body.email})
                .then(function(result) {
                    if (result.length === 0) {
                        user.save().then(function () {
                            console.log("A new user has been added to the database.");
                            res.json({user: result, status: true, message: 'You have been registered'});
                        }).catch(function (err) {
                            console.log(err.message);
                        });
                    } else {
                        res.json({user: result, status: true, message: 'You are now logging in'});
                    }
                });
        })
        .catch(function (error) {
            console.log(error.message);
        });
});

app.get('/getcredits/:id', function(req, res) {

    const id = req.params.id;

    db()
        .then(function() {

            User.findOneAndUpdate({_id: ObjectId(id)}, {$inc: {credits: 100}}, {new: true})
                .then(result => res.json(result))
                .catch(err => console.log(err.message))
        });
});

app.get('/menu', function(req, res) {

});