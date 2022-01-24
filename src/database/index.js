const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Amount = require('../model/Amount');
const User = require('../model/User');

const connection = new Sequelize(dbConfig);

User.init(connection);
Amount.init(connection);

Amount.associate(connection.models);

module.exports = connection;
