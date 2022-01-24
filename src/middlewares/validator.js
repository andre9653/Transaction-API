const Validators = require('../services/validators/user.validator');

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

module.exports = { validRegister, validLogin };
