const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: 600000000,
  algorithm: 'HS256',
};

module.exports = {
  genToken(data) {
    return jwt.sign({ data }, SECRET, JWT_CONFIG);
  },
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET, { complete: true });
      const { id, email, role } = decoded.payload.data;
      return { id, email, role };
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
};
