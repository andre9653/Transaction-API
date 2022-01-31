const express = require('express');
const accountController = require('./controllers/accountController');
const usersController = require('./controllers/userController');
const Auth = require('./middlewares/Auth');
const valid = require('./middlewares/validator');

const routes = express.Router();

routes.get('/', usersController.index);
routes.post('/register', valid.validRegister, usersController.store);
// Rota de login quando bem sucedido retorna um token de autenticação.
routes.post('/login', valid.validLogin, usersController.login);
// Quando finalizado o cadastro, devera ser redirecionado para a rota de montante e inicial.
routes.post('/register/:user_id/amount', valid.validRegisterAmount, accountController.store);

routes.post('/payment/', valid.validTransfer, Auth.validToken, accountController.payment);
routes.put('/deposit', valid.validDeposit, accountController.deposit);

module.exports = routes;
