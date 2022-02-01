const ValidationError = require('../errors/ValidationError');
const Account = require('../model/Account');

const resultMessage = {
  notFound: 'not_found',
  Success(depositValue) {
    return { message: `O deposito no valor de R$${depositValue} foi efetuado com sucesso` };
  },
};

const depositServices = () => {
  const deposit = async (body) => {
    const { depositValue, accountNumber } = body;

    const accountUserReceiver = await Account.findOne({ where: { account_id: accountNumber } });
    if (!accountUserReceiver) throw new ValidationError(resultMessage.notFound);

    await accountUserReceiver.increment({ amount: depositValue });

    return resultMessage.Success(depositValue);
  };
  return {
    deposit,
  };
};

module.exports = depositServices();
