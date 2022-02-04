const usersModel = require('../models/usersModel');
const { makeSingature } = require('../auth/makeTokenSignature');
const { validatePassword, validateUserName } = require('./helpers');

const create = async ({ userName, password }) => {
  const validPassword = validatePassword(password);
  const userNameExists = await validateUserName(userName);

  if (!validPassword) return { statusCode: 400, responseMessage: { error: 'Senha insegura ou inválida' } };
  if (userNameExists) return { statusCode: 400, responseMessage: { error: 'Este usuário não está disponível' } };

  const insert = await usersModel.create({ userName, password });

  if (insert === 'user created successfully') {
    const signature = await makeSingature({userName, password});
  
    return { responseMessage: signature.responseMessage, statusCode: signature.status };
  }
  return { responseMessage: insert, statusCode: 400 };
};

module.exports = {
  create,
};