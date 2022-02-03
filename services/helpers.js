const usersModel = require('../models/usersModel');

const validatePassword = (password) => {
  if (password.length < 3) return null;

  return true;
};

const validateUserName = async (userName) => {
  const userNameExists = await usersModel.getByName(userName);
  if (userNameExists) return true;

  return null;
};

module.exports = {
  validatePassword,
  validateUserName,
};