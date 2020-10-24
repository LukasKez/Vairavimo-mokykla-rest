'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LectureSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: Date,
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: true
        }
    ]
});

module.exports = mongoose.model('Lecture', LectureSchema);