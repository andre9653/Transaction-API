/* eslint-disable camelcase */
const Sequelize = require('sequelize');
const Amount = require('../model/Account');
const User = require('../model/User');
const config = require('../config/database');

module.exports = {
  async store(user_id, startAmount) {
    try {
      const user = await User.findByPk(user_id);
      console.log(user);
      if (!user) {
        return { status: 404, message: 'not_found' };
      }
      await Amount.create({ amount: startAmount, user_id });
      return { status: 201, message: `Conta iniciada com R$ ${startAmount}` };
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'Internal Error' };
    }
  },
  async payment(id, body) {
    try {
      const sequelize = new Sequelize(config);
      if (!id || !body) {
        return { status: 401, message: 'Bad Request' };
      }
      const amountUserPayment = await Amount.findByPk(id);
      const userReceiver = await User.findOne({ where: { cpf: body.cpf } });
      const amountUserReceiver = await Amount.findByPk(userReceiver.id);

      if (!amountUserPayment) {
        return { status: 404, message: 'not_found' };
      }
      if (Number(id) === userReceiver.id) return { status: 401, message: 'Não é possível enviar um valor para a própria conta!' };
      if (typeof body.amount !== 'number') {
        return { status: 401, message: 'O valor a ser recebido deve ser do tipo Number' };
      }
      const result = sequelize.transaction(async (transaction) => {
        try {
          const updateUserPaymentAmount = await amountUserPayment
            .increment({ amount: -body.amount });
          const updateUserReceiverAmount = await amountUserReceiver
            .increment({ amount: body.amount });
        } catch (error) {

        }
      });
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'Internal Error' };
    }
  },
};
