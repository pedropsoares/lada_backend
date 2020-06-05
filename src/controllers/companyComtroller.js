const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const Opportunity = require('../models/Opportunity');

const tokenGenerator = require('../service/tokenGenerator');

module.exports = {
  async index(req, res) {
    const companys = await Company.find();

    console.log(req)

    return res.json(companys);
  },

  async home(req, res) {
    const company = await Company.findOne({ _id: req.companyId })

    return res.json({ company })
  },

  async store(req, res) {
    const { name, cnpj, password, langs, techs, bio, email } = req.body;
    const logo = req.file.destination;

    const hash = await bcrypt.hash(password, 10)

    let company = await Company.findOne({ cnpj });

    if (company) {
      return res.status(400).json({ menssage: 'non-existing user' })
    }

    const langsArray = langs.split(',').map(tech => tech.trim());
    const techsArray = techs.split(',').map(tech => tech.trim());

    company = await Company.create({
      name,
      cnpj,
      password: hash,
      langs: langsArray,
      techs: techsArray,
      bio,
      email,
      logo
    })

    const token = tokenGenerator.generateToken({ id: company._id })

    return res.status(200).json({
      company,
      token
    })
  },

  async update(req, res) {
    const { name, cnpj, password, techs, bio, email } = req.body;

    const hash = await bcrypt.hash(password, 10)

    const techsLangs = langs.split(',').map(tech => tech.trim());

    const techsArray = techs.split(',').map(tech => tech.trim());

    company = await Company.findOneAndUpdate(req.params.companyId, {
      name,
      cnpj,
      password: hash,
      langs: techsLangs,
      techs: techsArray,
      bio,
      email
    }, { new: true })
    return res.json({ company })
  },

  async listOpportunities(req, res) {
    const company = req.companyId;

    let opportunity = await Opportunity.find({ company });

    return res.json({ opportunity })
  }
};