const Account = require('../model/Account');

module.exports = {
  async deposit(body) {
    try {
      const { depositValue, accountNumber } = body;

      const accountUserReceiver = await Account.findOne({ where: { account_id: accountNumber } });
      if (!accountUserReceiver) return { status: 404, message: 'not_found' };
      await accountUserReceiver
        .increment({ amount: depositValue });
      return { status: 201, message: `O deposito no valor de R$${depositValue} foi efetuado com sucesso` };
    } catch (error) {
      return { status: 500, message: 'Internal Error' };
    }
  },
};
