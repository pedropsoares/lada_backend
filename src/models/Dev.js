const mongoose = require('mongoose'); 

const DevSchema = new mongoose.Schema({
  name: String,
  password: String,
  username_github: String,
  techs: [String],
  avatar_url: String,
  phone: String,
  email: String
})

module.exports = mongoose.model('Dev', DevSchema);