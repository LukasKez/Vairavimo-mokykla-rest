'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');


exports.list_users = function(req, res) {
    User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.create_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.status(409).send(err);
    res.status(201).send(user);
  });
};

exports.read_user = function(req, res) {
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

exports.update_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
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

exports.delete_user = function(req, res) {
  User.remove({_id: req.params.userId}, function(err, user) {
    if (!user) {
      res.status(404).send({
        userId: req.params.userId,
        error: "not found"});
    } else {
        if (err)
          res.send(err);
        res.json({ message: 'User ' + req.params.userId + ' successfully deleted' });
    }
  });
};


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