const { INTERNAL_SERVER_ERROR } = require('http-status');
const ResourceNotFound = require('../errors/ResourceNotFound');
const ValidationError = require('../errors/ValidationError');

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ResourceNotFound || err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(INTERNAL_SERVER_ERROR).json({ statusMessage: 'Internal Server Error' });
};

module.exports = errorMiddleware;
