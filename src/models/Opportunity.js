const mongoose = require('mongoose');

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

module.exports = mongoose.model('Opportunity', OpportunitySchema);

