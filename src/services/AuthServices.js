const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: 60,
  algorithm: 'HS256',
};

module.exports = {
  genToken(data) {
    return jwt.sign({ data }, SECRET, JWT_CONFIG);
  },
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET);
      const { _id, email, role } = decoded.data;
      return { _id, email, role };
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
};
