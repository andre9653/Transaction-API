const { Model, DataTypes } = require('sequelize');

class Account extends Model {
  static init(connection) {
    super.init({
      account_id: DataTypes.STRING,
      amount: DataTypes.DECIMAL(10, 2),
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'account' });
  }
}

module.exports = Account;
