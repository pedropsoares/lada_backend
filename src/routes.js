const express = require('express');

const routes = express.Router();

const devAuth = require('./service/devAuth');
const devController = require('./controllers/devController');

routes.get('/dev', devController.index);
routes.post('/dev', devController.store);

routes.post('/login', devAuth.session);

module.exports = routes;