const Cv = require('../models/Cv');
const Dev = require('../models/Dev');

module.exports = {
  async show(req, res) {
    const { idDev } = req.params;
    const cv = await Cv.findOne({ dev: idDev })

    return res.json(cv.url)
  },

  async store(req, res) {
    const idDev = req.devId
    const dev = await Dev.findOne({ _id: idDev });
    const nameDev = dev.name.replace(/\s+/g, '');

    const { size, key, location: url } = req.file

    let cv = await Cv.findOne({ dev: idDev });

    if (!cv) {
      cv = await Cv.create({
        name: 'CV_' + nameDev,
        size,
        key,
        url,
        dev: idDev
      })

    } else {
      return res.status(400).json({ menssage: 'to insert a new cv delete the previous one' })
    }

    return res.status(200).json({
      cv
    })
  },
  async delete(req, res) {
    cv = await Cv.findOneAndDelete({ dev: req.devId });

    return res.send();
  }
}