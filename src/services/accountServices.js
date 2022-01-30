/* eslint-disable camelcase */
const ValidationError = require('../errors/ValidationError');
const Account = require('../model/Account');
const Amount = require('../model/Account');
const User = require('../model/User');
const { randomNumber } = require('../utils/utils');

const resultInfo = {
  notFound: 'not_found',
  exist: 'Ja existe uma conta para este usuário',
  Success(startAmount) {
    return { message: `Conta iniciada com R$ ${startAmount}` };
  },
  internalError: { status: 500, message: 'Internal Error' },
};

const accountServices = () => {
  const store = async (user_id, startAmount) => {
    const user = await User.findByPk(user_id);
    if (!user) throw new ValidationError(resultInfo.notFound);
    const userAccount = await Amount.findOne({ where: { user_id } });
    if (userAccount) throw new ValidationError(resultInfo.exist);
    await Amount.create({ amount: startAmount, user_id, account_id: randomNumber() });
    return resultInfo.Success(startAmount);
  };

  return { store };
};

module.exports = accountServices;
