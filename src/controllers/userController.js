const httpStatus = require('http-status');
const usersService = require('../services/usersServices');

const userController = () => {
  const index = async (req, res) => {
    const result = await usersService.findAll();
    return res.status(httpStatus.OK).json(result);
  };

  const store = async (req, res) => {
    const result = await usersService.createUser(req.body);
    return res.status(httpStatus.CREATED).json(result);
  };

  const login = async (req, res) => {
    const result = await usersService.login(req.body);
    return res.status(httpStatus.OK).json(result);
  };

  return {
    index,
    store,
    login,
  };
};

module.exports = userController();
