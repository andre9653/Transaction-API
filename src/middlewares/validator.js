const Validators = require('../services/validators/user.validator');
const ValidatorAmount = require('../services/validators/depositValidator');
const accountsValidator = require('../services/validators/accountsValidator');

const validRegister = async (req, res, next) => {
  try {
    const validated = await Validators.register.validateAsync(req.body);
    req.body = validated;
    return next();
  } catch (err) {
    return res.status(401).json({ Error: err.message });
  }
};
const validLogin = async (req, res, next) => {
  try {
    const validated = await Validators.login.validateAsync(req.body);
    req.body = validated;
    return next();
  } catch (err) {
    return res.status(401).json({ Error: err.message });
  }
};
const validDeposit = async (req, res, next) => {
  try {
    const validated = await ValidatorAmount.deposit.validateAsync(req.body);
    req.body = validated;
    return next();
  } catch (err) {
    return res.status(401).json({ Error: err.message });
  }
};
const validTransfer = async (req, res, next) => {
  try {
    const validated = await ValidatorAmount.transfer.validateAsync(req.body);
    req.body = validated;
    return next();
  } catch (err) {
    return res.status(401).json({ Error: err.message });
  }
};
const validRegisterAmount = async (req, res, next) => {
  try {
    const validated = await accountsValidator.validateAsync(req.body);
    req.body = validated;
    return next();
  } catch (err) {
    return res.status(401).json({ Error: err.message });
  }
};

module.exports = {
  validRegister,
  validLogin,
  validDeposit,
  validTransfer,
  validRegisterAmount,
};
