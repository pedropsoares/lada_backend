const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) 
    return res.status(401).send({ error: 'No token provide' });

  const parts = authHeader.split(' ');

  if (!parts.lengh === 2)
    return res.status(401).send({ error: 'Token error0' })

  const [ scheme, token ]  = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' });

    req.devId = decoded.id;
    return next();
  });
}