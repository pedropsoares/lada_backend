const Recruiter = require('../models/Recruiter');
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

    recruiter = await Recruiter.findOneAndUpdate(req.params.recruiterId, {
      name,
      email,
      password: hash,
      phone,
    }, { new: true })
    return res.json({ recruiter })
  },

  async delete(req, res) {
    recruiter = await Recruiter.findOneAndDelete({ _id: req.params._id });

    return res.status(200).send({  message: 'Recruiter excluido com sucesso!' });
  }
};