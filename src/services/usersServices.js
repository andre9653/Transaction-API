const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const ValidationError = require('../errors/ValidationError');
const User = require('../model/User');
const AuthServices = require('./AuthServices');

const resultInfo = {
  internalError: { status: 500, message: 'Internal_error' },
  exist: 'Ja existe usuário com este email ou cpf',
  invalidLogin: 'Email ou senha inválidos',
};

const usersServices = () => {
  const findAll = async () => User.findAll({
    attributes: ['id', 'name', 'email'],
  });

  const createUser = async ({
    email, password, cpf, name,
  }) => {
    const hasUserOnDatabase = await User.findOne({ where: { [Op.or]: [{ cpf }, { email }] } });

    if (hasUserOnDatabase) throw new ValidationError(resultInfo.exist);
    const cryptPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: cryptPassword, cpf, name,
    });
    return { email: user.email, name: user.name };
  };

  const login = async ({ email, password }) => {
    const result = await User.findOne({ where: { email } });
    if (!result) throw new ValidationError(resultInfo.invalidLogin);

    const valid = bcrypt.compareSync(password, result.password);
    if (!valid) throw new ValidationError(resultInfo.invalidLogin);

    const token = AuthServices.genToken({ name: result.name, email: result.email, id: result.id });
    /* O token gerado a baixo deve ser retornado pelo header da requisição para
      acessar as demais rotas */
    return { token };
  };

  return {
    findAll,
    createUser,
    login,
  };
};

module.exports = usersServices();
