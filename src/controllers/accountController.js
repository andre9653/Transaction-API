/* eslint-disable camelcase */
const httpStatus = require('http-status');
const accountServices = require('../services/accountServices');
const depositServices = require('../services/depositServices');
const { transactionsServices } = require('../services/transactionsServices');

const accountController = () => {
  const store = async (req, res) => {
    const { user_id } = req.params;
    const { startAmount } = req.body;
    const result = await accountServices().store(user_id, startAmount);
    return res.status(httpStatus.CREATED).json(result);
  };

  const payment = async (req, res) => {
    const { id } = req.user;
    const { status, message } = await transactionsServices().payment(id, req.body);
    return res.status(status).json({ message });
  };

  const deposit = async (req, res) => {
    const { status, message } = await depositServices.deposit(req.body);
    return res.status(status).json({ message });
  };

  return {
    store,
    payment,
    deposit,
  };
};

module.exports = accountController();
