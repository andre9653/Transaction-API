const Amount = require('../model/Amount');
const User = require('../model/User');

module.exports = {
  async store(req, res) {
    const { user_id } = req.params;
    const { startAmount } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'not_found' });
    }
    await Amount.create({ amount: startAmount, user_id });
    return res.status(201).json({ message: `Conta iniciada com R$ ${startAmount}` });
  },
};
