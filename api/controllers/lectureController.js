'use strict';

const { jwt_secret } = require('../../env.config');

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Lecture = mongoose.model('Lecture');

exports.list_lectures = function (req, res) {
    Lecture.find()
        .populate('lecturer', ['name', 'surname'])
        .populate('students', ['name', 'surname'])
        .exec((err, lectures) => {
            if (err)
                res.send(err);
            res.json(lectures);
        })
};

exports.create_lecture = (req, res) => {
    let lecturerId = req.jwt.userId;
    req.body.lecturer = lecturerId;

    let new_lecture = new Lecture(req.body);
    new_lecture.save((err, lecture) => {
        if (err)
            res.status(409).send(err);

        let students = req.body.students;
        students.forEach(userId => {
            User.findById(userId, (err, user) => {
                if (err)
                    res.status(409).send(err);
                user.lectures.push(new_lecture);
                user.save();
            })
        });
        res.status(201).send(lecture);
    });
};

exports.read_lecture = function (req, res) {
    Lecture.findById(req.params.lectureId)
        .populate('lecturer', ['name', 'surname'])
        .populate('students', ['name', 'surname'])
        .exec((err, lecture) => {
            if (err) {
                res.status(404).send({
                    lectureId: req.params.lectureId,
                    message: "not found"
                });
            }
            res.json(lecture);
        })
};

exports.update_lecture = function (req, res) {
    Lecture.findOneAndUpdate({ _id: req.params.lectureId }, req.body, { new: true }, function (err, lecture) {
        if (!lecture) {
            res.status(404).send({
                lectureId: req.params.lectureId,
                message: "not found"
            });
        } else {
            if (err)
                res.send(err);
            res.status(204).send({});
        }
    });
};

exports.delete_lecture = function (req, res) {
    Lecture.findOneAndDelete({ _id: req.params.lectureId }, function (err, lecture) {
        if (!lecture) {
            res.status(404).send({
                lectureId: req.params.lectureId,
                error: "not found"
            });
        } else {
            if (err)
                res.send(err);
            let students = lecture.students;
            students.forEach(userId => {
                User.updateOne({ _id: userId }, { $pull: { "lectures": req.params.lectureId } }, (err) => {
                    if (err)
                        res.send(err);
                });
                res.json({ message: 'Lecture ' + req.params.lectureId + ' successfully deleted' });
            });
        }
    });
};


exports.list_users = function (req, res) {
    Lecture.findById(req.params.lectureId, function (err, lecture) {
        if (!lecture) {
            res.status(404).send({
                lectureId: req.params.lectureId,
                error: "not found"
            });
        } else {
            if (err)
                res.status(500).send(err);
            User.find({ lectures: lecture._id}, (err, users) => {
                if (err)
                    res.status(500).send(err);
                res.json(users);
            })
        }
    })
};

exports.read_user = function (req, res) {
    Lecture.findById(req.params.lectureId, function (err, lecture) {
        if (!lecture) {
            res.status(404).send({
                lectureId: req.params.lectureId,
                error: "not found"
            });
        } else {
            if (err)
                res.status(500).send(err);
            User.findById(req.params.userId, (err, user) => {
                if (!user) {
                    res.status(404).send({
                        userId: req.params.userId,
                        error: "not found"
                    });
                } else if (err)
                    res.status(500).send(err);
                else
                    res.json(user);
            })
        }
    })
};