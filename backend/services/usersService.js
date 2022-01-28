const usersModel = require('../models/usersModel');
const { makeSingature } = require('../auth/makeTokenSignature');
const { validatePassword, validateUserName } = require('./helpers');

const create = async ({ userName, password }) => {
  const validPassword = validatePassword(password);
  const userNameExists = await validateUserName(userName);

  if (!validPassword) return { statusCode: 400, responseMessage: 'Invalid or insecure password' };
  if (userNameExists) return { statusCode: 400, responseMessage: 'This user is not available' };

  const insert = await usersModel.create({ userName, password });

  if (insert === 'user created successfully') {
    const signature = await makeSingature({userName, password});
  
    return { responseMessage: { signature }, statusCode: 200 };
  }
  return { responseMessage: insert, statusCode: 400 };
};

module.exports = {
  create,
};