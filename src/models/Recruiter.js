const mongoose = require('mongoose');
const Company = require('./Company');

const RecruiterSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    select: false
  },
  phone: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    require: true,
    select: false
  }
})

RecruiterSchema.post('save', async function(recruiter) {
  
  let currentCompany = await Company.findById(recruiter.company)
  
  currentCompany = await Company.findOneAndUpdate({ _id: recruiter.company}, {
    recruiters: [...currentCompany.recruiters,  recruiter ]
  })

})

module.exports = mongoose.model('Recruiter', RecruiterSchema);