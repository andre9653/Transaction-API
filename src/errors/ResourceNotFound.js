const { NOT_FOUND } = require('http-status');

class ResourceNotFound extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'ResourceNotFound';
    this.message = args[0] || 'Not Found';
    this.statusCode = NOT_FOUND;
    Error.captureStackTrace(this, ResourceNotFound);
  }
}

module.exports = ResourceNotFound;
