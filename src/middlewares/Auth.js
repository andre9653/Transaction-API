const AuthService = require('../services/AuthServices');

module.exports = {
  validToken(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ message: 'jwt malformed' });

      const user = AuthService.verifyToken(authorization);
      if (!user) return res.status(401).json({ message: 'jwt malformed' });

      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Error' });
    }
  },
};
