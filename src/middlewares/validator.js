const ValidationError = require('../errors/ValidationError');

const validator = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    return next(new ValidationError(err.message));
  }
};

module.exports = {
  validator,
};
