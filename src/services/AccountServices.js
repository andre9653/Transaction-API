/* eslint-disable camelcase */
const Amount = require('../model/Account');
const User = require('../model/User');

const resultInfo = {
  notFound: { status: 404, message: 'not_found' },
  exist: { status: 422, message: 'Ja existe uma conta para este usuário' },
  Success(startAmount) {
    return { status: 201, message: `Conta iniciada com R$ ${startAmount}` };
  },
  internalError: { status: 500, message: 'Internal Error' },
};

module.exports = {
  async store(user_id, startAmount) {
    try {
      const user = await User.findByPk(user_id);
      if (!user) return resultInfo.notFound;
      const userAccount = await Amount.findOne({ where: { user_id } });
      if (userAccount) return resultInfo.exist;
      await Amount.create({ amount: startAmount, user_id, account_id: `${(10 * Math.random(10))}` });
      return resultInfo.Success(startAmount);
    } catch (error) {
      return resultInfo.internalError;
    }
  },
};
