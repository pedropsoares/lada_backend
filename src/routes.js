const express = require('express');

const routes = express.Router();

const devController = require('./controllers/devController');

routes.get('/dev', devController.index);
routes.post('/dev', devController.store);

module.exports = routes;