const Joi = require('joi');

const deposit = Joi.object({
  depositValue: Joi.number().precision(2).min(1).less(2000)
    .required(),
  accountNumber: Joi.number().integer().required(),
});
const transfer = Joi.object({
  amount: Joi.number().precision(2).min(1).required(),
  cpf: Joi.string().min(11).max(11).required(),
});

module.exports = {
  deposit,
  transfer,
};
