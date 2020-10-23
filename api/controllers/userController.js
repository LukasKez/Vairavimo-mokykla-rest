'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Office = mongoose.model('Office'),
    Lecture = mongoose.model('Lecture');

const crypto = require('crypto');

// Get user list
exports.list_users = (req, res) => {
    User.find()
        .populate('office')
        .populate('lectures')
        .exec((err, users) => {
            if (err)
                res.send(err);
            res.json(users);
        })
}

// Create user
exports.create_user = (req, res) => {
    if (!req.body.password)
        res.status(409).send({ message: "Password is required" });

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.password)
        .digest("base64");
    req.body.password = salt + "$" + hash;

    let new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err) {
            if (err.name === "MongoError" && err.code === 11000)
                // Duplicate username
                return res.status(409).send({ message: 'Username already exists!' });
            res.status(409).send(err);
        }
        //attach office to user model
        let officeId = req.body.office;
        Office.findById(officeId, (err, office) => {
            if (err) {
                res.status(409).send(err);
            }
            office.users.push(new_user);
            office.save();
        });
        res.status(201).send(user);
    });
};

// Get user by ID
exports.read_user = (req, res) => {
    User.findById(req.params.userId)
        .populate('office')
        .populate('lectures')
        .exec((err, user) => {
            if (err) {
                res.status(404).send({
                    userId: req.params.userId,
                    message: "not found"
                });
            }
            res.json(user);
        })
};

exports.update_user = function (req, res) {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt)
            .update(req.body.password)
            .digest("base64");
        req.body.password = salt + "$" + hash;
    }
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
        if (!user) {
            res.status(404).send({
                userId: req.params.userId,
                message: "not found"
            });
        } else {
            if (err)
                res.send(err);
            res.status(204).send({});
        }
    });
};

exports.delete_user = function (req, res) {
    User.findOneAndDelete({ _id: req.params.userId }, function (err, user) {
        if (!user) {
            res.status(404).send({
                userId: req.params.userId,
                error: "not found"
            });
        } else {
            if (err)
                res.send(err);
            let officeId = user.office;
            Office.updateOne({ _id: officeId }, { $pull: { "users": req.params.userId } }, (err) => {
                if (err)
                    res.send(err);
            });
            res.json({ message: 'User ' + req.params.userId + ' successfully deleted' });
        }
    });
};


exports.list_lectures = function (req, res) {
    User.findById(req.params.userId, (err, user) => {
        if (!user) {
            res.status(404).send({
                userId: req.params.userId,
                error: "not found"
            });
        } else {
            if (err)
                res.status(500).send(err);
            Lecture.find({ students: user._id}, (err, lectures) => {
                if (err)
                    res.status(500).send(err);
                res.json(lectures);
            })
        }
    })
};

exports.read_lecture = function (req, res) {
    User.findById(req.params.userId, (err, user) => {
        if (!user) {
            res.status(404).send({
                userId: req.params.userId,
                error: "not found"
            });
        } else {
            if (err)
                res.status(500).send(err);
            Lecture.findById(req.params.lectureId, (err, lecture) => {
                if (!lecture) {
                    res.status(404).send({
                        lectureId: req.params.lectureId,
                        error: "not found"
                    });
                } else if (err)
                    res.status(500).send(err);
                else 
                    res.json(lecture);
            })
        }
    })
};