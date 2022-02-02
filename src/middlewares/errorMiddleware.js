const { INTERNAL_SERVER_ERROR } = require('http-status');
const ResourceNotFound = require('../errors/ResourceNotFound');
const ValidationError = require('../errors/ValidationError');

const errorMiddleware = (err, req, res, next) => {
  const internalErrors = [ResourceNotFound, ValidationError];

  if (internalErrors.some((internalErr) => err instanceof internalErr)) {
    return res.status(err.statusCode).json(err);
  }

  if (process.env.NODE_ENV !== 'production') {
    return next(err);
  }
  return res
    .status(INTERNAL_SERVER_ERROR)
    .json({ statusMessage: 'Internal Server Error' });
};

module.exports = errorMiddleware;
