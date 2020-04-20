const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    select: false
  },
  username_github: String,
  langs: [{
    name: String,
    score: Number
  }],
  techs: [{
    name: String,
    score: Number
  }],
  avatar_url: String,
  phone: String,
})

module.exports = mongoose.model('Dev', DevSchema);