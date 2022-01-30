const AuthService = require('../services/AuthServices');

const resultInfo = {
  jwtError: {
    status: 401,
    message: 'jwt malformed',
  },
  internalError: {
    status: 500,
    message: 'Internal Error',
  },
};

const { jwtError, internalError } = resultInfo;

module.exports = {
  validToken(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(jwtError.status).json({ message: jwtError.message });

      const user = AuthService.verifyToken(authorization);
      if (!user) return res.status(jwtError.status).json({ message: jwtError.message });

      req.user = user;
      return next();
    } catch (error) {
      return res.status(internalError.status).json({ message: internalError.message });
    }
  },
};
