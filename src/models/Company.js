const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: String,
  cnpj: String,
  bio: String,
  techs: [String],
  recruiters: [
    {
      name: String,
      email: String,
      password: String,
    }
  ],
  opportunitys: [
    {
      title: String,
      descption: String,
      techs: [String]
    }
  ]
})

module.exports = mongoose.model('Company', CompanySchema);