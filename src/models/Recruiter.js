const mongoose = require('mongoose');

const RecruiterSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  phone: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    require: true,
  }
})

RecruiterSchema.post('save', async function (recruiter) {
  const Company = require('./Company');

  let currentCompany = await Company.findById(recruiter.company)

  await Company.findOneAndUpdate({ _id: recruiter.company }, {
    recruiters: [...currentCompany.recruiters, recruiter]
  })

})

RecruiterSchema.post('findOneAndUpdate', async function (recruiter) {
  const Company = require('./Company');

  let currentCompany = await Company.findById(recruiter.company)

  await Company.findOneAndUpdate({ _id: recruiter.company }, {
    recruiters: [...currentCompany.recruiters.filter(({ _id }) => String(_id) !== String(recruiter._id)),
      recruiter]
  })

})

RecruiterSchema.post('findOneAndDelete', async function (recruiter) {
  const Company = require('./Company');

  let currentCompany = await Company.findById(recruiter.company)

  await Company.findOneAndUpdate({ _id: recruiter.company }, {
    recruiters: currentCompany.recruiters.filter(({ _id }) => String(_id) !== String(recruiter._id))
  })

})

module.exports = mongoose.model('Recruiter', RecruiterSchema);