const messagesService = require('../services/messagesService');

const create = async (req, res) => {
  try {
    const { _id: userID } = req.user;
    const { messageText } = req.body;
    const insert = await messagesService.create({ userID, messageText });
  
    res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json('error, try again latter');
  }
};

module.exports = {
  create,
};