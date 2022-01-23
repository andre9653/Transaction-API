const User = require('../model/User');

module.exports = {
  async store(req, res) {
    const {
      name, email, cpf, password,
    } = req.body;
    const user = await User.create({
      name, email, cpf, password,
    });
    return res.status(200).json(user);
  },
};
