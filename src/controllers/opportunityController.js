const Opportunity = require('../models/Opportunity');
const Company = require('../models/Company');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {

    const opportunitys = await Opportunity.find()

    return res.send({ opportunitys });
  },

  async store(req, res) {
    const { title, descption, techs } = req.body;
    const company = req.companyId

    const techsArray = techs.split(',').map(tech => tech.trim());

    let opportunity = await Opportunity.findOne({ title, company });

    if (!opportunity) {

      opportunity = await Opportunity.create({
        title,
        descption,
        techs: techsArray,
        company
      })


    } else {
      return res.status(400).json({ menssage: 'opportunity with the ' + title + ' already exists' })
    }

    return res.status(200).json({
      opportunity
    })
  },

  async update(req, res) {
    const { title, descption, techs } = req.body;
    const company = req.companyId

    const techsArray = techs.split(',').map(tech => tech.trim());

    opportunity = await Opportunity.findOneAndUpdate({ title, company }, {
      title,
      descption,
      techs: techsArray,
    }, { new: true })
    return res.json({ opportunity })
  }
};