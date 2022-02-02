const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

require('dotenv').config();

const secret = process.env.TOKEN_SECRET;

const isInvalidInputFields = (userName, password) => {
if (!userName || !password) return true;
return false;
};

const isInvalidLogin = (user, password) => {
if (!user || user.password !== password) return true;
return false;
};

const makeSingature = async ({ userName, password }) => {
  try {
  if (isInvalidInputFields(userName, password)) { 
    return { responseMessage: { error: 'All fields must be filled' }, status: 400 }; 
  }

  const user = await usersModel.getByName(userName);

  if (isInvalidLogin(user, password)) {
    return { responseMessage: { error: 'Incorrect username or password' }, status: 401 };
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

  return { responseMessage: { token }, status: 200 };
  } catch (err) {
    console.error(err)
    return { responseMessage: { error: 'Erro interno ao gerar token' }, status: 400 };
  }
};

module.exports = {
  makeSingature,
};