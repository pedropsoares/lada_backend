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

routes.post('/dev', devController.store);
routes.get('/dev', devController.index);
routes.put('/dev', authDevMiddleware,devController.update)

routes.post('/dev/login', devAuth.session);

routes.post('/company', companyController.store),
routes.get('/company', companyController.index),
routes.put('/company', authCompanyMiddleware, companyController.update);

routes.post('/company/login', companyAuth.session);

routes.get('/company/recruiters', authCompanyMiddleware, recruitController.index),
routes.post('/company/recruiters', authCompanyMiddleware, recruitController.store),
routes.put('/company/recruiters', authCompanyMiddleware, recruitController.update)

routes.post('/recruiter/login', recruiterAuth.session);



module.exports = routes;