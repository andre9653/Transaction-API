const UsersService = require('../services/UsersService');

module.exports = {
  async index(req, res) {
    const result = await UsersService.findAll();
    return res.status(result.status).json(result.message);
  },
  async store(req, res) {
    const result = await UsersService.createUser(req.body);
    return res.status(result.status).json(result.message);
  },
  async login(req, res) {
    const result = await UsersService.login(req.body);
    return res.status(result.status).json(result.message);
  },
};
