module.exports = {
  production: {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'transactions',
    define: {
      timestamp: true,
      underscored: true,
    },
  },
  development: {
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
