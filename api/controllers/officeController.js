'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.list_offices = function (req, res) {
    res.json({
        "Offices": [
            {
                ID: 1,
                City: "Kaunas",
                Adress: "Kalnų g. 5",
                Users: ['User1', 'User2', 'User3']
            }, {
                ID: 2,
                City: "Vilnius",
                Adress: "Vingio g. 69",
                Users: ['User1', 'User2', 'User3']
            }
        ]
    });
};

exports.create_office = function (req, res) {
    res.json({
        ID: 1,
        City: "Kaunas",
        Adress: "Kalnų g. 5",
        Users: ['User1', 'User2', 'User3']
    });
};

exports.read_office = function (req, res) {
    res.json({
        ID: 1,
        City: "Kaunas",
        Adress: "Kalnų g. 5",
        Users: ['User1', 'User2', 'User3']
    });
};

exports.update_office = function (req, res) {
    res.json({
        ID: 1,
        City: "Kaunas",
        Adress: "Kalnų g. 5",
        Users: ['User1', 'User2', 'User3']
    });
};

exports.delete_office = function (req, res) {
    res.json({ message: 'Deleted office ID 1' });
};


exports.list_users = function (req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    })
};

exports.read_user = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (!user) {
          res.status(404).send({
            userId: req.params.userId,
            error: "not found"});
        } else {
            if (err)
              res.send(err);
            res.json(user);
        }
    });
};