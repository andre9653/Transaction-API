const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Account = require('../model/Account');
const Transactions = require('../model/Transactions');
const User = require('../model/User');

const connection = new Sequelize(dbConfig);

User.init(connection);
Account.init(connection);
Transactions.init(connection);

Account.associate(connection.models);
// Transactions.associate(connection.models);

module.exports = connection;
