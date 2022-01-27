const bcrypt = require('bcrypt');
const User = require('../model/User');
const AuthServices = require('./AuthServices');

module.exports = {
  async findAll() {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email'],
      });
      return { status: 200, message: users };
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: { Error: 'Internal_error' } };
    }
  },

  async createUser({
    email, password, cpf, name,
  }) {
    try {
      const haveUserEmail = await User.findOne({ where: { email } });
      const haveUserCpf = await User.findOne({ where: { cpf } });

      if (haveUserEmail || haveUserCpf) {
        return { status: 401, message: { Error: 'Ja existe usuario com este email ou cpf' } };
      }
      const cryptPassword = await bcrypt.hash(password, 10);
      const userData = await User.create({
        email, password: cryptPassword, cpf, name,
      });
      return { status: 201, message: userData };
    } catch (error) {
      return { status: 500, message: { Error: 'Internal_error' } };
    }
  },

  async login({ email, password }) {
    const result = await User.findOne({ where: { email } });
    if (!result) {
      return { status: 401, message: { Error: 'Email ou senha inválidos' } };
    }
    const valid = bcrypt.compareSync(password, result.password);
    if (!valid) {
      return { status: 401, message: { Error: 'Email ou senha inválidos' } };
    }
    const user = AuthServices.genToken({ name: result.name, email });
    return { status: 200, message: { token: user } };
  },
};
