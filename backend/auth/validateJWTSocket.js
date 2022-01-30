const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

require('dotenv').config();

const secret = process.env.TOKEN_SECRET;

module.exports = async (token) => {
  if (!token) return { errorMessage: 'missing auth token' };

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.getByName(decoded.data.userName);

    if (!user) return { errorMessage: 'jwt malformed' };

    return user;
  } catch (error) {
    console.error(error);
    return { errorMessage: err.message };
  }
};