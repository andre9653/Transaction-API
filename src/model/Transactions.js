const { Model, DataTypes } = require('sequelize');

class Transactions extends Model {
  static init(connection) {
    super.init({
      amount: DataTypes.DECIMAL(10, 2),
      account_payer_id: DataTypes.STRING,
      account_receiver_id: DataTypes.STRING,
    }, {
      sequelize: connection,
    });
  }
}

module.exports = Transactions;
