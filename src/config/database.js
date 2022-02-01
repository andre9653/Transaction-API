require('dotenv').config();

module.exports = {
  production: {
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
    define: {
      timestamp: true,
      underscored: true,
    },
  },
  development: {
    dialect: 'mysql',
    host: 'localhost',
    username: 'development',
    password: 'development',
    database: 'development',
    port: 3308,
    define: {
      timestamp: true,
      underscored: true,
    },
  },
  test: {
    dialect: 'mysql',
    host: 'localhost',
    username: 'test',
    password: 'test',
    database: 'test',
    port: 3307,
    define: {
      timestamp: true,
      underscored: true,
    },
  },
};
