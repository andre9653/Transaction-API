/* eslint-disable camelcase */
const AmountServices = require('../services/AmountServices');

module.exports = {
  async store(req, res) {
    const { user_id } = req.params;
    const { startAmount } = req.body;
    const { status, message } = await AmountServices.store(user_id, startAmount);
    return res.status(status).json({ message });
  },
  async payment(req, res) {
    const { id } = req.params;
    const { status, message } = await AmountServices.payment(id, req.body);
    return res.status(status).json({ message });
  },
};
