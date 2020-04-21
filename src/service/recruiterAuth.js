const Recruiter = require('../models/Recruiter');
const bcrypt = require('bcrypt');

const tokenGenerator = require('./tokenGenerator');

module.exports = {
  async session(req, res) { 
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email }).select('+password');
    
    if (!recruiter)
    return res.status(400).json({ error: 'recruiter not found' });
    
    if (!await bcrypt.compare(password, recruiter.password))
    return res.status(400).json({ error: 'Invalid password' });
    
    recruiter.password = undefined;

    res.json({ 
      recruiter, 
      token: tokenGenerator.generateToken({ id: recruiter._id })
    });

  }
}