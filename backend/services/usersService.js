const usersModel = require('../models/usersModel');
const { validatePassword, validateUserName } = require('./helpers');

const create = async ({ userName, password }) => {
  const validPassword = validatePassword(password);
  const userNameExists = await validateUserName(userName);

  if (!validPassword) return { statusCode: 400, responseMessage: 'Invalid or insecure password' };
  if (userNameExists) return { statusCode: 400, responseMessage: 'This user is not available' };

  const insert = await usersModel.create({ userName, password });

  return { responseMessage: insert, statusCode: 201 };
};

module.exports = {
  create,
};