const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const devAuth = require('./service/devAuth');
const devController = require('./controllers/devController');

routes.get('/dev', devController.index);
routes.post('/dev', devController.store);
routes.put('/dev', authMiddleware,devController.update)

routes.post('/login', devAuth.session);

module.exports = routes;