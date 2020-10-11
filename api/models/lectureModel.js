'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LectureSchema = new Schema({
  Type: String,
  Lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  Date: Date,
  Students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model('Lecture', LectureSchema);