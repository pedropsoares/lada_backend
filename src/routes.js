const express = require('express');

const routes = express.Router();

routes.get('/users', (req, res) => {
  console.log(req.query);
  return res.json({message: 'hello lada'})
})

module.exports = routes;