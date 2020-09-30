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
  office: Number // office ID? 
});

module.exports = mongoose.model('Users', UserSchema);