/* eslint-disable camelcase */
const AccountServices = require('../services/AccountServices');

module.exports = {
  async store(req, res) {
    const { user_id } = req.params;
    const { startAmount } = req.body;
    const { status, message } = await AccountServices.store(user_id, startAmount);
    return res.status(status).json({ message });
  },
  async payment(req, res) {
    const { id } = req.params;
    const { status, message } = await AccountServices.payment(id, req.body);
    return res.status(status).json({ message });
  },
};
