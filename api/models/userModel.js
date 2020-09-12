'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  Name: String,
  Surname: String,
  Username: String,
  Password: String,
  Created_date: {
    type: Date,
    default: Date.now
  },
  Role: Number
});

module.exports = mongoose.model('Users', UserSchema);