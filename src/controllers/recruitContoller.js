const Recruiter = require('../models/Recruiter');
const company = require('../models/Company')
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {

    const recruiters = await Recruiter.find()

    return res.send({ recruiters });
  },

  async store(req, res) {
    const { name, email, password, phone } = req.body;

    const hash = await bcrypt.hash(password, 10)

    let recruiter = await Recruiter.findOne({ email });

    
    if (!recruiter) {

      
      recruiter = await Recruiter.create({
        name,
        email,
        password: hash,
        phone,
        company: req.companyId
      })

      
    } else {
      return res.status(400).json({ menssage: 'non-existing user' })
    }
     
    return res.status(200).json({
      recruiter
    })
  },

  async update(req, res) {
    const { name, email, password, phone } = req.body;

    const hash = await bcrypt.hash(password, 10)

    dev = await Dev.findOneAndUpdate(req.params.devId, {
      name,
      email,
      password: hash,
      phone
    }, { new: true })
    return res.json({ dev })
  }
};