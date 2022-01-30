const Sequelize = require('sequelize');
const config = require('../config/database');
const Account = require('../model/Account');
const Transactions = require('../model/Transactions');
const User = require('../model/User');

const errorMessage = {
  notFound: { status: 404, message: 'not_found' },
  insufficientFunds: { status: 422, message: 'Saldo insuficiente' },
  ownAccount: { status: 401, message: 'Não é possível transferir um valor para a própria conta!' },
  internalError: { status: 500, message: 'Internal Error' },
};
const success = (amount) => ({ status: 201, message: `Pagamento de R$${amount} Realizado` });

const transactionsServices = () => {
  const payment = async (id, body) => {
    try {
      const { amount } = body;
      const sequelize = new Sequelize(config);
      const accountUserPayment = await Account.findOne({ where: { user_id: id } });
      if (!accountUserPayment) return errorMessage.notFound;
      if (accountUserPayment.amount < body.amount) return errorMessage.insufficientFunds;

      const userReceiver = await User.findOne({ where: { cpf: body.cpf } });
      if (!userReceiver) return errorMessage.notFound;
      const accountUserReceiver = await Account.findOne({ where: { user_id: userReceiver.id } });
      if (!accountUserReceiver) return errorMessage.notFound;

      if (Number(id) === userReceiver.id) return errorMessage.ownAccount;
      await sequelize.transaction(async (transaction) => {
        try {
          const payerAccount = await accountUserPayment
            .increment({ amount: -body.amount }, { transaction });
          const receiverAccount = await accountUserReceiver
            .increment({ amount: body.amount }, { transaction });
          return Transactions.create({
            amount,
            account_payer_id: payerAccount.account_id,
            account_receiver_id: receiverAccount.account_id,
          }, { transaction });
        } catch (error) {
          return errorMessage.internalError;
        }
      });
      return success(amount);
    } catch (error) {
      return errorMessage.internalError;
    }
  };
  return { payment };
};

module.exports = {
  transactionsServices,
};
