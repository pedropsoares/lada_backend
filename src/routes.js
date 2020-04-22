const express = require('express');

const routes = express.Router();

const authDevMiddleware = require('./middlewares/authDev');
const authCompanyMiddleware = require('./middlewares/authCompany');

const devAuth = require('./service/devAuth');
const devController = require('./controllers/devController');

const companyAuth = require('./service/companyAuth');
const companyController = require('./controllers/companyComtroller');

const recruiterAuth = require('./service/recruiterAuth');
const recruitController = require('./controllers/recruitContoller');

const opportunityController = require('./controllers/opportunityController');

routes.post('/dev', devController.store);
routes.get('/dev', devController.index);
routes.put('/dev', authDevMiddleware,devController.update)

routes.post('/dev/login', devAuth.session);

routes.post('/company', companyController.store),
routes.get('/company', companyController.index),
routes.put('/company', authCompanyMiddleware, companyController.update);

routes.post('/company/login', companyAuth.session);

routes.post('/company/recruiters', authCompanyMiddleware, recruitController.store),
routes.get('/company/recruiters', authCompanyMiddleware, recruitController.index),
routes.put('/company/recruiters', authCompanyMiddleware, recruitController.update)
routes.delete('/company/recruiters', authCompanyMiddleware, recruitController.delete)

routes.post('/recruiter/login', recruiterAuth.session);

routes.post('/company/opportunitys', authCompanyMiddleware, opportunityController.store),
routes.put('/company/opportunitys', authCompanyMiddleware, opportunityController.update)
routes.delete('/company/opportunitys', authCompanyMiddleware, opportunityController.delete)

module.exports = routes;