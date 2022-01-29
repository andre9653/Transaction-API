const express = require('express');
const AmountController = require('./controllers/AmountController');
const UsersController = require('./controllers/UsersController');
const Auth = require('./middlewares/Auth');
const valid = require('./middlewares/validator');

const routes = express.Router();

routes.get('/', UsersController.index);
routes.post('/cadastro', valid.validRegister, UsersController.store);
// Rota de login quando bem sucedido retorna um token de autenticação.
routes.post('/login', valid.validLogin, UsersController.login);
// Quando finalizado o cadastro, devera ser redirecionado para a rota de montante e inicial.
routes.post('/cadastro/:user_id/amount', AmountController.store);

routes.put('/payment/:id', Auth.validToken, AmountController.payment);

module.exports = routes;
