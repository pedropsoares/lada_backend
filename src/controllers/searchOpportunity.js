const Opportunity = require('../models/Opportunity');

module.exports = {
  async index(req, res) {
    const { search = '' } = req.body;

    let opportunitys = await Opportunity.find({
      $or: [
        { title: { $regex: search ,$options: 'i' } },
        { descption: { $regex: search ,$options: 'i' } }
      ]
    })

    return res.send({ opportunitys });
  }
}