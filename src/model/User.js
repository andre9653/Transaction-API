const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      cpf: DataTypes.INTEGER,
      password: DataTypes.STRING.BINARY,
    }, {
      sequelize: connection,
    });
  }
}

module.exports = User;
