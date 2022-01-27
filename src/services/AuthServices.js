const jwt = require('jsonwebtoken');

const API_SECRET = 'AND032';

const JWT_CONFIG = {
  expiresIn: 60,
  algorithm: 'HS256',
};

module.exports = {
  genToken(data) {
    return jwt.sign({ data }, API_SECRET, JWT_CONFIG);
  },
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, API_SECRET);
      const { _id, email, role } = decoded.data;
      return { _id, email, role };
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
};
