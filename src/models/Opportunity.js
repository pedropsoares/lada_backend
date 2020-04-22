const mongoose = require('mongoose');
const Company = require('./Company');

const OpportunitySchema = new mongoose.Schema({
  title: String,
  descption: String,
  techs: [String],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    require: true,
  }
})

OpportunitySchema.post('save', async function (opportunity) {

  const currentCompany = await Company.findById(opportunity.company)

  await Company.findOneAndUpdate({ _id: opportunity.company }, {
    opportunitys: [...currentCompany.opportunitys, opportunity]
  })

})

OpportunitySchema.post('findOneAndUpdate', async function (opportunity) {

  const currentCompany = await Company.findById(opportunity.company)
  
  await Company.findOneAndUpdate({ _id: opportunity.company }, {
    opportunitys: [...currentCompany.opportunitys.filter(({ _id }) => String(_id) !== String(opportunity._id)),
      opportunity]
  })

})


module.exports = mongoose.model('Opportunity', OpportunitySchema);

