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
    return { errorMessage: 'All fields must be filled' }; 
  }

  const user = await usersModel.getByName(userName);

  if (isInvalidLogin(user, password)) {
    return { errorMessage: 'Incorrect username or password' };
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

  return { token };
  } catch (err) {
    return { errorMessage: 'Erro interno ao gerar token', error: err.message };
  }
};

module.exports = {
  makeSingature,
};