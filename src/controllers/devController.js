const Dev = require('../models/Dev');
const Lang = require('../models/Lang');
const Tech = require('../models/Tech');
const axios = require('axios');
const bcrypt = require('bcrypt');

const { getLangsAndtechs } = require('../service/spy');

const tokenGenerator = require('../service/tokenGenerator');

module.exports = {
  async show(req, res) {
    const { lang = "", tech = "" } = req.query;

    const where = {}

    if (lang.length) {
      where['langs.name'] = { $in: [lang] };
    }

    if (tech.length) {
      where['techs.name'] = { $in: [tech] };
    }

    return res.send({ devs: await Dev.find(where) });
  },

  async store(req, res) {
    const { name, username_github, password, phone, email } = req.body;

    const hash = await bcrypt.hash(password, 10)

    let dev = await Dev.findOne({ username_github });

    if (!dev) {
      const apiRes = await axios.get(`https://api.github.com/users/${username_github}`);

      const { avatar_url } = apiRes.data;

      const { langs, techs } = await getLangsAndtechs(username_github);

      const existinglangs = await Lang.find();
      const existingTechs = await Lang.find();

      const remainingLangs = langs.filter(({ name }) =>
        existinglangs.findIndex(lang => lang.name === name) === -1).map(({ name }) => ({ name }))

      if (remainingLangs.length) {
        Lang.insertMany(remainingLangs);
      }

      const remainingTechs = techs.filter(({ name }) =>
        existingTechs.findIndex(lang => lang.name === name) === -1).map(({ name }) => ({ name }))

      if (remainingTechs.length) {
        Tech.insertMany(remainingTechs);
      }

      dev = await Dev.create({
        name,
        email,
        password: hash,
        username_github,
        avatar_url,
        phone,
        langs,
        techs
      })
    } else {
      return res.status(400).json({ menssage: 'non-existing user' })
    }

    const token = tokenGenerator.generateToken({ id: dev._id })

    return res.status(200).json({
      dev,
      token
    })
  },

  async update(req, res) {
    const { username_github, name, password, phone, email } = req.body;

    const hash = await bcrypt.hash(password, 10)

    let newPassword = String;

    const devCurr = await Dev.findById(req.devId)

    if (password != devCurr.password) {
      newPassword = hash;
    } else {
      newPassword = password;
    }

    dev = await Dev.findByIdAndUpdate(req.devId, {
      name,
      email,
      username_github,
      password: newPassword,
      phone
    }, { new: true })
    return res.json({ dev })
  },
  async delete(req, res) {
    dev = await Dev.findOneAndDelete({ _id: req.params._id });
    return res.status(200).send({ message: 'Recruiter excluido com sucesso!' });
  }
};