'use strict';

var mongoose = require('mongoose'),
    Office = mongoose.model('Office'),
    User = mongoose.model('User');

exports.list_offices = (req, res) => {
    Office.find()
        .populate('users')
        .exec((err, offices) => {
            if (err)
                res.send(err);
            res.json(offices);
        })
}

exports.create_office = (req, res) => {
    let new_office = new Office(req.body);
    new_office.save((err, office) => {
        if (err)
            res.status(409).send(err);
        res.status(201).send(office);
    });
};

exports.read_office = (req, res) => {
    Office.findById(req.params.officeId)
        .populate('users')
        .exec((err, office) => {
            if (err) {
                res.status(404).send({
                    officeId: req.params.officeId,
                    message: "not found"
                });
            }
            res.json(office);
        })
};

exports.update_office = function (req, res) {
    Office.findOneAndUpdate({ _id: req.params.officeId }, req.body, { new: true }, function (err, office) {
        if (!office) {
            res.status(404).send({
                officeId: req.params.officeId,
                message: "not found"
            });
        } else {
            if (err)
                res.send(err);
            res.status(204).send({});
        }
    });
};

exports.delete_office = function (req, res) {
    Office.findOneAndDelete({ _id: req.params.officeId }, function (err, office) {
        if (!office) {
            res.status(404).send({
                officeId: req.params.officeId,
                error: "not found"
            });
        } else {
            if (err)
                res.send(err);
            let users = office.users;
            users.forEach(userId => {
                User.deleteOne({ _id: userId }, (err) => {
                    if (err)
                        res.status(500).send(err);
                });
            });
            
            res.json({ message: 'Office ' + req.params.officeId + ' successfully deleted' });
        }
    });
};


exports.list_users = (req, res) => {
    Office.findById(req.params.officeId, function (err, office) {
        if (!office) {
            res.status(404).send({
                officeId: req.params.officeId,
                error: "not found"
            });
        } else {
            if (err)
                res.status(500).send(err);
            User.find({ office: office._id}, (err, users) => {
                if (err)
                    res.status(500).send(err);
                res.json(users);
            })
        }
    })
};

exports.read_user = function (req, res) {
    Office.findById(req.params.officeId, function (err, office) {
        if (!office) {
            res.status(404).send({
                officeId: req.params.officeId,
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