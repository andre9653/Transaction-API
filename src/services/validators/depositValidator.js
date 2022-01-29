const Joi = require('joi');

const deposit = Joi.object({
  depositValue: Joi.number().precision(2).min(1).less(2000)
    .required(),
  accountNumber: Joi.number().integer().required(),
});

module.exports = {
  deposit,
};
