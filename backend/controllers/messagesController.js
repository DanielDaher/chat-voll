const messagesService = require('../services/messagesService');

const create = async (req, res) => {
  try {
    const { _id: userID } = req.user;
    const { messageText } = req.body;
    const { statusCode, responseMessage } = await messagesService.create({ userID, messageText });
  
    return { statusCode, responseMessage };
  } catch (error) {
    console.error(error);
    console.error(error)
    return  { statusCode: 400, responseMessage: error };
  }
};

module.exports = {
  create,
};