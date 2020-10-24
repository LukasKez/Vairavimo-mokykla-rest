'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: Number,
        default: 1
    },
    office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Office",
        required: true
    },
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture"
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);