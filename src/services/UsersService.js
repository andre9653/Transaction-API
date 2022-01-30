const bcrypt = require('bcrypt');
const User = require('../model/User');
const AuthServices = require('./AuthServices');

const resultInfo = {
  internalError: { status: 500, message: 'Internal_error' },
  exist: { status: 401, message: 'Ja existe usuário com este email ou cpf' },
  invalidLogin: { status: 401, message: 'Email ou senha inválidos' },
};
module.exports = {
  async findAll() {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email'],
      });
      return { status: 200, message: users };
    } catch (error) {
      return resultInfo.internalError;
    }
  },

  async createUser({
    email, password, cpf, name,
  }) {
    try {
      const haveUserEmail = await User.findOne({ where: { email } });
      const haveUserCpf = await User.findOne({ where: { cpf } });

      if (haveUserEmail || haveUserCpf) return resultInfo.exist;
      const cryptPassword = await bcrypt.hash(password, 10);
      await User.create({
        email, password: cryptPassword, cpf, name,
      });
      return {
        status: 201,
        message: { email, name },
      };
    } catch (error) {
      return resultInfo.internalError;
    }
  },

  async login({ email, password }) {
    try {
      const result = await User.findOne({ where: { email } });
      if (!result) return resultInfo.invalidLogin;
      const valid = bcrypt.compareSync(password, result.password);
      if (!valid) return resultInfo.invalidLogin;

      const user = AuthServices.genToken({ name: result.name, email, id: result.id });
      /* O token gerado a baixo deve ser retornado pelo header da requisição para
      acessar as demais rotas */
      return { status: 200, message: { token: user } };
    } catch (error) {
      return resultInfo.internalError;
    }
  },
};
