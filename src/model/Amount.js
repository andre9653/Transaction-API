const { Model, DataTypes } = require('sequelize');

class Amount extends Model {
  static init(connection) {
    super.init({
      amount: DataTypes.INTEGER,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
  }
}

module.exports = Amount;
