const { Model, DataTypes } = require('sequelize');

class Transactions extends Model {
  static init(connection) {
    super.init({
      date: DataTypes.DATE,
      value: DataTypes.INTEGER,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id_payment', as: 'owner' });
  }
}

module.exports = Transactions;
