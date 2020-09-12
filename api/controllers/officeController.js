'use strict';

exports.list_offices = function (req, res) {
    res.json({ message: 'List of offices' });
};

exports.create_office = function (req, res) {
    res.json({ message: 'Created new office' });
};

exports.read_office = function (req, res) {
    res.json({ message: 'Office information here' });
};

exports.update_office = function (req, res) {
    res.json({ message: 'Updated office information' });
};

exports.delete_office = function (req, res) {
    res.json({ message: 'Deleted office' });
};

// var mongoose = require('mongoose'),
//   User = mongoose.model('Users');


// exports.list_users = function(req, res) {
//     User.find({}, function(err, user) {
//     if (err)
//       res.send(err);
//     res.json(user);
//   });
// };

// exports.create_user = function(req, res) {
//   var new_user = new User(req.body);
//   new_user.save(function(err, user) {
//     if (err)
//       res.send(err);
//     res.json(user);
//   });
// };

// exports.read_user = function(req, res) {
//   User.findById(req.params.userId, function(err, user) {
//     if (err)
//       res.send(err);
//     res.json(user);
//   });
// };

// exports.update_user = function(req, res) {
//   User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
//     if (err)
//       res.send(err);
//     res.json(user);
//   });
// };

// exports.delete_user = function(req, res) {
//   User.remove({_id: req.params.userId}, function(err, user) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'User successfully deleted' });
//   });
// };