const Joi = require('joi');

const amount = Joi.object({
  amount: Joi.number().precision(2).min(1).required(),
});

module.exports = amount;
