const express = require('express');
const userController = require('./controllers/userController');

const routes = express.Router();

routes.get('/', (req, res) => res.status(200).json({ teste: 'ok' }));
routes.post('/users', userController.store);

module.exports = routes;
