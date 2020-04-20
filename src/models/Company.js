const mongoose = require('mongoose');

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
  opportunitys: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
  }]
})

module.exports = mongoose.model('Company', CompanySchema);
