const express = require('express');
const accountController = require('./controllers/accountController');
const usersController = require('./controllers/userController');
const Auth = require('./middlewares/Auth');
const usersValidations = require('./services/validators/userValidator');
const accountsValidations = require('./services/validators/accountsValidator');
const depositValidations = require('./services/validators/depositValidator');
const { validator } = require('./middlewares/validator');

const routes = express.Router();

// Rota de login quando bem sucedido retorna um token de autenticação.
routes.post('/login', validator(usersValidations.login), usersController.login);

routes.get('/users', usersController.index);
routes.post('/users/register', validator(usersValidations.register), usersController.store);
// Quando finalizado o cadastro, devera ser redirecionado para a rota de montante e inicial.
routes.post('/accounts/register/:user_id', validator(accountsValidations.amount), accountController.store);

routes.post('/accounts/payment', validator(depositValidations.transfer), Auth.validToken, accountController.payment);
routes.put('/accounts/deposit', validator(depositValidations.deposit), accountController.deposit);
routes.get('/accounts/listTransactions', accountController.index);

module.exports = routes;
