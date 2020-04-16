const Company = require('../models/Company');
const bcrypt = require('bcrypt');

const tokenGenerator = require('./tokenGenerator');

module.exports = {
  async session(req, res) { 
    const { cnpj, password } = req.body;

    const company = await Company.findOne({ cnpj }).select('+password');
    
    if (!company)
    return res.status(400).json({ error: 'company not found' });
    
    if (!await bcrypt.compare(password, company.password))
    return res.status(400).json({ error: 'Invalid password' });
    
    company.password = undefined;

    res.json({ 
      company, 
      token: tokenGenerator.generateToken({ id: company._id })
    });

  }
}