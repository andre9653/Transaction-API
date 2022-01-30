const connection = require('../database');
const ValidationError = require('../errors/ValidationError');
const Account = require('../model/Account');
const Transactions = require('../model/Transactions');
const User = require('../model/User');

const errorMessage = {
  notFound: 'not_found',
  insufficientFunds: 'Saldo insuficiente',
  ownAccount: 'Não é possível transferir um valor para a própria conta!',
};
const success = (amount) => ({ status: 201, message: `Pagamento de R$${amount} Realizado` });

const transactionsServices = () => {
  const payment = async (id, body) => {
    const { amount } = body;
    const accountUserPayment = await Account.findOne({ where: { user_id: id } });
    if (!accountUserPayment) throw new ValidationError(errorMessage.notFound);
    if (accountUserPayment.amount < body.amount) {
      throw new ValidationError(errorMessage.insufficientFunds);
    }

    const userReceiver = await User.findOne({ where: { cpf: body.cpf } });
    if (!userReceiver) throw new ValidationError(errorMessage.notFound);
    const accountUserReceiver = await Account.findOne({ where: { user_id: userReceiver.id } });
    if (!accountUserReceiver) throw new ValidationError(errorMessage.notFound);

    if (Number(id) === userReceiver.id) throw new ValidationError(errorMessage.ownAccount);
    await connection.transaction(async (transaction) => {
      const payerAccount = await accountUserPayment
        .increment({ amount: -body.amount }, { transaction });
      const receiverAccount = await accountUserReceiver
        .increment({ amount: body.amount }, { transaction });
      return Transactions.create({
        amount,
        account_payer_id: payerAccount.account_id,
        account_receiver_id: receiverAccount.account_id,
      }, { transaction });
    });
    return success(amount);
  };
  return { payment };
};

module.exports = {
  transactionsServices,
};
