const Company= require('../models/Company');
const bcrypt = require('bcrypt');

const tokenGenerator = require('../service/tokenGenerator');

module.exports = {
  async index(req, res) {
    const companys = await Company.find();

    return res.json(companys);
  },

  async store(req, res) {
    const { name, cnpj, password, techs, bio, email } = req.body;

    const hash = await bcrypt.hash(password, 10)

    let company = await Company.findOne({ cnpj });

    if (company) {
      return res.status(400).json({ menssage: 'non-existing user' })
    }

      const techsArray = techs.split(',').map(tech => tech.trim());

      company = await Company.create({
        name,
        cnpj,
        password: hash,
        techs: techsArray,
        bio,
        email
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

      const techsArray = techs.split(',').map(tech => tech.trim());

      company = await Company.findOneAndUpdate(req.params.companyId, {
        name,
        cnpj,
        password: hash,
        techs: techsArray,
        bio,
        email
      }, { new: true })
      return res.json({ company })
    } 
};