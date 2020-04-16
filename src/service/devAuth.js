const Dev = require('../models/Dev');
const bcrypt = require('bcrypt');

const tokenGenerator = require('./tokenGenerator');

module.exports = {
  async session(req, res) { 
    const { username_github, password } = req.body;

    const dev = await Dev.findOne({ username_github }).select('+password');
    
    if (!dev)
    return res.status(400).json({ error: 'Dev not found' });
    
    if (!await bcrypt.compare(password, dev.password))
    return res.status(400).json({ error: 'Invalid password' });
    
    dev.password = undefined;

    res.json({ 
      dev, 
      token: tokenGenerator.generateToken({ id: dev._id })
    });

  }
}