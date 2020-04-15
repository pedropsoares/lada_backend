const Dev = require('../models/Dev');
const bcrypt = require('bcrypt');

module.exports = {
  async session(req, res) { 
    const { username_github, password } = req.body;

    const dev = await Dev.findOne({ username_github }).select('+password');

    if (!dev)
      return res.status(400).json({ error: 'Dev not found' });

    if (!await bcrypt.compare(password, dev.password))
      return res.status(400).json({ error: 'Invalid password' });

    res.json({ dev });

  }
}