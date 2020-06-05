const express = require('express');
const multer = require('multer');

const routes = express.Router();

const authDevMiddleware = require('./middlewares/authDev');
const authCompanyMiddleware = require('./middlewares/authCompany');

const devAuth = require('./service/devAuth');
const devController = require('./controllers/devController');

const multerConfig = require('./config/multer');
const uploadConfig = require('./config/upload');

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
routes.delete('/api/dev/:_id',  devController.delete)

routes.post('/api/dev/login', devAuth.session); 

routes.get('/api/dev/filter', devController.show);

routes.post('/api/cv', multer(multerConfig).single('file'), authDevMiddleware, cvController.store);
routes.delete('/api/cv', cvController.delete);

routes.post('/api/company', multer(uploadConfig).single('logoCompany'), companyController.store),
routes.get('/api/company', companyController.index),
routes.put('/api/company', authCompanyMiddleware, companyController.update);

routes.get('/api/company/opportunities', authCompanyMiddleware, companyController.listOpportunities)
routes.get('/api/company/home', authCompanyMiddleware, companyController.home)

routes.post('/api/company/login', companyAuth.session);

routes.post('/api/recruiters', authCompanyMiddleware, recruitController.store),
routes.get('/api/recruiters', authCompanyMiddleware, recruitController.index),
routes.put('/api/recruiters', authCompanyMiddleware, recruitController.update)
routes.delete('/api/recruiters/:_id', authCompanyMiddleware, recruitController.delete)

routes.post('/api/recruiter/login', recruiterAuth.session);

routes.post('/api/opportunitys', authCompanyMiddleware, opportunityController.store),
routes.get('/api/opportunitys', opportunityController.index);
routes.put('/api/opportunitys', authCompanyMiddleware, opportunityController.update)
routes.delete('/api/opportunitys/:_id', authCompanyMiddleware, opportunityController.delete)

routes.get('/api/opportunitys/search', searchOpportunity.index);
routes.get('/api/opportunitys/filter', opportunityController.show);

module.exports = routes;