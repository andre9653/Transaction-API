/* eslint-disable camelcase */
const ValidationError = require('../errors/ValidationError');
const Account = require('../model/Account');
const Amount = require('../model/Account');
const User = require('../model/User');
const { randomNumber } = require('../utils/utils');

const resultInfo = {
  notFound: 'User not found.',
  exist: 'Ja existe uma conta para este usuário.',
  Success(startAmount, id) {
    return { id, message: `Conta iniciada com R$ ${startAmount}` };
  },
};

const accountServices = () => {
  const store = async (user_id, startAmount) => {
    const user = await User.findOne({
      where: { id: user_id },
      include: { model: Account, as: 'account' },
    });

    if (!user) throw new ValidationError(resultInfo.notFound);
    if (user.account) throw new ValidationError(resultInfo.exist);

    const account = await Amount
      .create({ amount: startAmount, user_id, account_id: randomNumber() });
    return resultInfo.Success(startAmount, account.account_id);
  };

  return { store };
};

module.exports = accountServices;
