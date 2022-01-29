const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Account = require('../model/Account');
const User = require('../model/User');

const connection = new Sequelize(dbConfig);

User.init(connection);
Account.init(connection);

Account.associate(connection.models);

module.exports = connection;
