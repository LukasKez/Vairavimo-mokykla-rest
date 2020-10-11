'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfficeSchema = new Schema({
  City: String,
  Address: String,
  Users: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      }
  ]
});

module.exports = mongoose.model('Office', OfficeSchema);