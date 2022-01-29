/* eslint-disable camelcase */
const Amount = require('../model/Account');
const User = require('../model/User');

module.exports = {
  async store(user_id, startAmount) {
    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        return { status: 404, message: 'not_found' };
      }
      const userAccount = await Amount.findOne({ where: { user_id } });
      if (userAccount) return { status: 422, message: 'Ja existe uma conta para este usuário' };
      await Amount.create({ amount: startAmount, user_id, account_id: `${(10 * Math.random(10))}` });
      return { status: 201, message: `Conta iniciada com R$ ${startAmount}` };
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'Internal Error' };
    }
  },
};
