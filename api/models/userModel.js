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
    required: true
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
    default: 0
  },
  Office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Office"
  },
  Lectures: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture"
  }
});

module.exports = mongoose.model('User', UserSchema);