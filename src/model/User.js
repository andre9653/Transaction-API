const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      cpf: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.hasOne(models.Account, { foreignKey: 'user_id', as: 'owner' });
  }
}

module.exports = User;
