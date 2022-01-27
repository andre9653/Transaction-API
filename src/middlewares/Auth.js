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
  validTokenUpdate(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ message: 'missing auth token' });

      const user = AuthService.verifyToken(authorization);
      if (!user) return res.status(401).json({ message: 'jwt malformed' });

      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Error' });
    }
  },
  validTokenDelete(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ message: 'missing auth token' });
      const user = AuthService.verifyToken(authorization);
      req.user = user;

      if (user.role !== 'admin') return res.status(401).json({ message: 'Do not have authorization' });
      return next();
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'Internal Error' });
    }
  },
  validTokenAdmin(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ message: 'missing auth token' });

      const user = AuthService.verifyToken(authorization);
      if (!user) return res.status(401).json({ message: 'jwt malformed' });
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can register new admins' });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Error' });
    }
  },
};
