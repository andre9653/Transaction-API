const express = require('express');
const usersController = require('./controllers/usersController');
const valid = require('./middlewares/validator');

const routes = express.Router();

routes.get('/', usersController.index);
routes.post('/cadastro', valid.validRegister, usersController.store);
routes.post('/login', valid.validLogin, usersController.login);

module.exports = routes;
