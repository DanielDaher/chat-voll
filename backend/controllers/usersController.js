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

module.exports = {
  create,
};