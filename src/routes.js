const express = require('express');
const multer = require('multer');

const routes = express.Router();

const authDevMiddleware = require('./middlewares/authDev');
const authCompanyMiddleware = require('./middlewares/authCompany');

const devAuth = require('./service/devAuth');
const devController = require('./controllers/devController');

const multerConfig = require('./config/multer');

const companyAuth = require('./service/companyAuth');
const companyController = require('./controllers/companyComtroller');

const recruiterAuth = require('./service/recruiterAuth');
const recruitController = require('./controllers/recruitContoller');

const searchOpportunity = require('./controllers/searchOpportunity');
const opportunityController = require('./controllers/opportunityController');

const cvController = require('./controllers/cvContoller');

routes.post('/api/dev', devController.store);
routes.get('/api/dev', devController.index);
routes.put('/api/dev', authDevMiddleware,devController.update)

routes.post('/api/dev/login', devAuth.session); 

routes.get('/api/devs/filter', devController.show);

routes.post('/api/cv', multer(multerConfig).single('file'), authDevMiddleware, cvController.store);
routes.delete('/api/cv', authDevMiddleware, cvController.delete);

routes.post('/api/company', companyController.store),
routes.get('/api/company', companyController.index),
routes.put('/api/company', authCompanyMiddleware, companyController.update);

routes.post('/api/company/login', companyAuth.session);

routes.post('/api/company/recruiters', authCompanyMiddleware, recruitController.store),
routes.get('/api/company/recruiters', authCompanyMiddleware, recruitController.index),
routes.put('/api/company/recruiters', authCompanyMiddleware, recruitController.update)
routes.delete('/api/company/recruiters', authCompanyMiddleware, recruitController.delete)

routes.post('/api/recruiter/login', recruiterAuth.session);

routes.post('/api/company/opportunitys', authCompanyMiddleware, opportunityController.store),
routes.put('/api/company/opportunitys', authCompanyMiddleware, opportunityController.update)
routes.delete('/api/company/opportunitys', authCompanyMiddleware, opportunityController.delete)

routes.get('/api/opportunitys', opportunityController.index);
routes.get('/api/opportunities/search', searchOpportunity.index);
routes.get('/api/opportunities/filter', opportunityController.show);

module.exports = routes;