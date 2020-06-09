const Opportunity = require('../models/Opportunity');

module.exports = {
  async index(req, res) {

    const opportunitys = await Opportunity.find()

    return res.send({ opportunitys });
  },

  async show(req, res) {
    const { langs = [], techs = [], city = ''} = req.body;

    const where = {};

    if (langs.length) {
      where['langs'] = { $in: langs };
    }

    if (techs.length) {
      where['techs'] = { $in: techs };
    }

    if (city.length) {
      where.city =  city ;
    }

    return res.send({ opportunitys: await Opportunity.find(where) });
  },

  async store(req, res) {
    const { title = "", descption = "", langs = [], techs = [], salary = "", city = "" } = req.body;
    const company = req.companyId

    const langsArray = langs.split(', ').map(tech => tech.trim());
    const techsArray = techs.split(', ').map(tech => tech.trim());

    let opportunity = await Opportunity.findOne({ title, company });

    if (!opportunity) {

      opportunity = await Opportunity.create({
        title,
        descption,
        langs: langsArray,
        techs: techsArray,
        company,
        salary,
        city
      })


    } else {
      return res.status(400).json({ menssage: 'opportunity with the ' + title + ' already exists' })
    }

    return res.status(200).json({
      opportunity
    })
  },

  async update(req, res) {
    const { title, descption, langs, techs, salary, _id } = req.body;

    console.log(langs)

    // const langsArray = langs.split(',').map(tech => tech.trim());
    // const techsArray = techs.split(',').map(tech => tech.trim());

    opportunity = await Opportunity.findByIdAndUpdate( _id , {
      title,
      descption,
      langs,
      techs,
      salary
    }, { new: true })
    return res.json({ opportunity })
  },

  async delete(req, res) {
    opportunity = await Opportunity.findOneAndDelete({ _id: req.params._id});

    return res.status(200).send({ message: 'Opportunity excluido com sucesso!' });
  }
};