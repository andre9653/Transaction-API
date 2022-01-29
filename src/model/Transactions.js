const { Model, DataTypes } = require('sequelize');

class Transactions extends Model {
  static init(connection) {
    super.init({
      amount: DataTypes.INTEGER,
      account_payer_id: DataTypes.STRING,
      account_receiver_id: DataTypes.STRING,
    }, {
      sequelize: connection,
    });
  }

  // static associate(models) {
  //   this.hasMany(
  //     models.Account,
  //     { foreignKey: 'account_payer_id', as: 'payer' },
  //     { foreignKey: ' account_receiver_id', as: 'receiver' },
  //   );
  // }
}

module.exports = Transactions;
