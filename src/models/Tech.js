const mongoose = require('mongoose');

const TechSchema = new mongoose.Schema({
  name: String,
})

module.exports = mongoose.model('Tech', TechSchema);