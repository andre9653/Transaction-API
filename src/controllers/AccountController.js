/* eslint-disable camelcase */
const AccountServices = require('../services/AccountServices');
const DepositServices = require('../services/Deposit.Services');
const { transactionsServices } = require('../services/transactionsServices');

module.exports = {
  async store(req, res) {
    const { user_id } = req.params;
    const { startAmount } = req.body;
    const { status, message } = await AccountServices.store(user_id, startAmount);
    return res.status(status).json({ message });
  },
  async payment(req, res) {
    const { user_id } = req.params;
    const { status, message } = await transactionsServices().payment(user_id, req.body);
    return res.status(status).json({ message });
  },
  async deposit(req, res) {
    const { status, message } = await DepositServices.deposit(req.body);
    return res.status(status).json({ message });
  },
};
