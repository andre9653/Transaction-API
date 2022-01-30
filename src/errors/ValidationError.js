const { UNPROCESSABLE_ENTITY } = require('http-status');

class ValidationError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'ValidationError';
    this.statusMessage = args[0] || 'Not Found';
    this.statusCode = UNPROCESSABLE_ENTITY;
    Error.captureStackTrace(this, ValidationError);
  }
}

module.exports = ValidationError;
