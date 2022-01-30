const Account = require('../model/Account');

const resultMessage = {
  notFound: { status: 404, message: 'not_found' },
  Success(depositValue) {
    return { status: 201, message: `O deposito no valor de R$${depositValue} foi efetuado com sucesso` };
  },
  internalError: { status: 500, message: 'Internal Error' },
};

module.exports = {
  async deposit(body) {
    try {
      const { depositValue, accountNumber } = body;

      const accountUserReceiver = await Account.findOne({ where: { account_id: accountNumber } });
      if (!accountUserReceiver) return resultMessage.notFound;
      await accountUserReceiver
        .increment({ amount: depositValue });
      return resultMessage.Success(depositValue);
    } catch (error) {
      return resultMessage.internalError;
    }
  },
};
