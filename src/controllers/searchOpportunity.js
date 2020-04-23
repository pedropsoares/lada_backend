const Opportunity = require('../models/Opportunity');

module.exports = {
  async index(req, res) {
    const { title, city } = req.body;

    let opportunitys = await Opportunity.find({
      title: { '$regex': `${title}` },
      city: { '$regex': `${city}` }
    })

    if (!city)  
      opportunitys = await Opportunity.find({
        title: { '$regex': `${title}` }
      })

    if (!title)  
      opportunitys = await Opportunity.find({
        city: { '$regex': `${city}` }
      })


    return res.send({ opportunitys });
  }
}