const Lang = require('../models/Lang');
const Tech = require('../models/Tech');

module.exports = {

  async indexlangs(req, res) {
    const langs = await Lang.find();

    return res.json(langs);
  },

  async indexTechs(req, res) {
    const techs = await Tech.find();

    return res.json(techs);
  },


} 