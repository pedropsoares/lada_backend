const mongoose = require('mongoose');

const LangSchema = new mongoose.Schema({
  name: String,
})

module.exports = mongoose.model('Lang', LangSchema);