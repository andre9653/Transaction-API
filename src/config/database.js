module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'transactions',
  define: {
    timestamp: true,
    underscored: true,
  },
};
