const Dev = require('../models/Dev');
const axios = require('axios');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { username_github, password, techs, phone, email } = req.body;

    let dev = await Dev.findOne({ username_github });

    if (!dev) {
      const apiRes = await axios.get(`https://api.github.com/users/${username_github}`);

      const { name, avatar_url } = apiRes.data;

      const techsArray = techs.split(',').map(tech => tech.trim());

      dev = await Dev.create({
        name,
        email,
        username_github,
        password,
        avatar_url,
        techs: techsArray,
        phone
      })
    }

    return res.json(dev)
  }
};