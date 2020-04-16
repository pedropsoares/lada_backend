const Dev = require('../models/Dev');
const axios = require('axios');
const bcrypt = require('bcrypt');

const tokenGenerator = require('../service/tokenGenerator');


module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { username_github, password, techs, phone, email } = req.body;

    const hash = await bcrypt.hash(password, 10)

    let dev = await Dev.findOne({ username_github });

    if (!dev) {
      const apiRes = await axios.get(`https://api.github.com/users/${username_github}`);

      const { name, avatar_url } = apiRes.data;

      const techsArray = techs.split(',').map(tech => tech.trim());

      dev = await Dev.create({
        name,
        email,
        username_github,
        password: hash,
        avatar_url,
        techs: techsArray,
        phone
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
};