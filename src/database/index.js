const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Account = require('../model/Account');
const Transactions = require('../model/Transactions');
const User = require('../model/User');

const environment = process.env.NODE_ENV;
const connection = new Sequelize(dbConfig[environment]);

User.init(connection);
Account.init(connection);
Transactions.init(connection);

User.associate(connection.models);
Account.associate(connection.models);

module.exports = connection;
