const messagesService = require('../services/messagesService');

const create = async (req, res) => {
  try {
    const { _id: userID } = req.user;
    const { message } = req.body;
    const { statusCode, responseMessage } = await messagesService.create({ userID, message });
  
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