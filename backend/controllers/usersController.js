const { makeSingature } = require('../auth/makeTokenSignature');
const usersService = require('../services/usersService');

const create = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const insert = await usersService.create({ userName, password });
  
    res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json('error, try again latter');
  }
};

const makeLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const signature = await makeSingature({ userName, password });

    res.status(signature.status).json(signature.responseMessage);
  } catch (error) {
    res.status(400).json('error, try again latter');
    console.error(error);
  }
};

module.exports = {
  create,
  makeLogin,
};