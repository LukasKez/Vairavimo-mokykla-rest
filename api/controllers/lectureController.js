'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.list_lectures = function (req, res) {
    res.json({
        "Lectures": [
            {
                ID: 1,
                Type: "Teorinė paskaita",
                Lecturer: "Aloyzas Instruktorius",
                Date: "2020-10-15",
                Time: "14:30",
                Students: ['User1', 'User2', 'User3']
            }, {
                ID: 2,
                Type: "Praktinė paskaita (vairavimas)",
                Lecturer: "Aloyzas Instruktorius",
                Date: "2020-10-15",
                Time: "17:00",
                Students: ['User1']
            }
        ]
    });
};

exports.create_lecture = function (req, res) {
    res.json({
        ID: 1,
        Type: "Teorinė paskaita",
        Lecturer: "Aloyzas Instruktorius",
        Date: "2020-10-15",
        Time: "14:30",
        Students: ['User1', 'User2', 'User3']
    });
};

exports.read_lecture = function (req, res) {
    res.json({
        ID: 1,
        Type: "Teorinė paskaita",
        Lecturer: "Aloyzas Instruktorius",
        Date: "2020-10-15",
        Time: "14:30",
        Students: ['User1', 'User2', 'User3']
    });
};

exports.update_lecture = function (req, res) {
    res.json({
        ID: 1,
        Type: "Teorinė paskaita",
        Lecturer: "Aloyzas Instruktorius",
        Date: "2020-10-15",
        Time: "14:30",
        Students: ['User1', 'User2', 'User3']
    });
};

exports.delete_lecture = function (req, res) {
    res.json({ message: 'Deleted lecture ID 4' });
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