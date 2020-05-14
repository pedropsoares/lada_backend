const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: String,
  cnpj: String,
  email: String,
  logo: String,
  password: {
    type: String,
    select: false
  },
  bio: String,
  langs: [String],
  techs: [String],
  recruiters: [{}],
  opportunitys: [{}]
})

module.exports = mongoose.model('Company', CompanySchema);
