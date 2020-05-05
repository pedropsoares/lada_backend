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

routes.get('/dev', devController.index);

routes.post('/dev', devController.store);
routes.get('/dev/search', searchOpportunity.index);
routes.put('/dev', authDevMiddleware,devController.update)

routes.get('/dev/opportunities', opportunityController.show);

routes.post('/dev/login', devAuth.session); 

routes.post('/dev/cv/upload', multer(multerConfig).single('file'), authDevMiddleware, cvController.store);
routes.delete('/dev/cv/delete', authDevMiddleware, cvController.delete);

routes.post('/company', companyController.store),
routes.get('/company', companyController.index),
routes.put('/company', authCompanyMiddleware, companyController.update);

routes.get('/company/devs', devController.show);

routes.post('/company/login', companyAuth.session);

routes.post('/company/recruiters', authCompanyMiddleware, recruitController.store),
routes.get('/company/recruiters', authCompanyMiddleware, recruitController.index),
routes.put('/company/recruiters', authCompanyMiddleware, recruitController.update)
routes.delete('/company/recruiters', authCompanyMiddleware, recruitController.delete)

routes.post('/recruiter/login', recruiterAuth.session);

routes.post('/company/opportunitys', authCompanyMiddleware, opportunityController.store),
routes.put('/company/opportunitys', authCompanyMiddleware, opportunityController.update)
routes.delete('/company/opportunitys', authCompanyMiddleware, opportunityController.delete)

routes.get('/opportunitys', opportunityController.index);

module.exports = routes;