const mongoose = require('mongoose'); 

const DevSchema = new mongoose.Schema({
  name: {
    type: String,
    requiered: true,
  },
  password: {
    type: String,
    requiered: true,
    select: false,
  },
  username_github: String,
  techs: [String],
  avatar_url: String,
  phone: String,
  email: {
    type: String,
    unique: true,
    requiered: true,
  }
})

module.exports = mongoose.model('Dev', DevSchema);