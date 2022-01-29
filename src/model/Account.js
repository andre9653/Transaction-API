const { Model, DataTypes } = require('sequelize');

class Account extends Model {
  static init(connection) {
    super.init({
      account_id: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
  }
}

module.exports = Account;
