const Joi = require('joi');

const register = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
  name: Joi.string().min(2).required(),
  cpf: Joi.number().min(11).required(),
});

const login = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
});

module.exports = { register, login };
