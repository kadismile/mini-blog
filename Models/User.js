const mongoose = require('mongoose');
var randomstring = require("randomstring");

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate();
    }
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Users', UserSchema);