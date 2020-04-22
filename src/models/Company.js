const mongoose = require('mongoose');
const Recruiters = require('../models/Recruiter');

const CompanySchema = new mongoose.Schema({
  name: String,
  cnpj: String,
  password: {
    type: String,
    select: false
  },
  bio: String,
  techs: [String],
  recruiters: [{}],
  opportunitys: [{}]
})

module.exports = mongoose.model('Company', CompanySchema);
