const Sequelize = require('sequelize');
const config = require('../config/database');
const Account = require('../model/Account');
const Transactions = require('../model/Transactions');
const User = require('../model/User');

const transactionsServices = () => {
  const payment = async (id, body) => {
    const { amount } = body;
    try {
      const sequelize = new Sequelize(config);
      if (!id || !body) {
        return { status: 401, message: 'Bad Request' };
      }
      const accountUserPayment = await Account.findByPk(id);
      if (accountUserPayment.amount < body.amount) {
        return { status: 422, message: 'Saldo insuficiente' };
      }
      const userReceiver = await User.findOne({ where: { cpf: body.cpf } });
      if (!userReceiver) return { status: 404, message: 'not_found' };
      const accountUserReceiver = await Account.findOne({ where: { user_id: userReceiver.id } });

      if (!accountUserPayment || !accountUserReceiver) {
        return { status: 404, message: 'not_found' };
      }
      if (Number(id) === userReceiver.id) return { status: 401, message: 'Não é possível enviar um valor para a própria conta!' };
      if (typeof body.amount !== 'number') {
        return { status: 401, message: 'O valor a ser recebido deve ser do tipo Number' };
      }
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
          console.log('camada de services error - ', error.message);
          return null;
        }
      });
      return { status: 201, message: `Pagamento de R$${amount} Realizado` };
    } catch (error) {
      console.log('camada de services error - ', error.message);
      return { status: 500, message: 'Internal Error' };
    }
  };
  return { payment };
};

module.exports = {
  transactionsServices,
};
