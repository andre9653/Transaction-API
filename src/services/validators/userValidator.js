const Joi = require('joi');

const register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  name: Joi.string().min(2).required(),
  cpf: Joi.string().min(11).max(11).required(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

module.exports = { register, login };
