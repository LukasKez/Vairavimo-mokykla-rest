'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfficeSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  users: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      }
  ]
});

module.exports = mongoose.model('Office', OfficeSchema);