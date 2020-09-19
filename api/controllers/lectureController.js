'use strict';

exports.list_lectures = function (req, res) {
    res.json({ message: 'List of lectures' });
};

exports.create_lecture = function (req, res) {
    res.json({ message: 'Created new lecture' });
};

exports.read_lecture = function (req, res) {
    res.json({ message: 'Lecture information here' });
};

exports.update_lecture = function (req, res) {
    res.json({ message: 'Updated lecture information' });
};

exports.delete_lecture = function (req, res) {
    res.json({ message: 'Deleted lecture' });
};