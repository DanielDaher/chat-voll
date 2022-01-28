const messagesModel = require('../models/messagesModel');

const create = async ({ userID, messageText }) => {
  const timeStamp = Date.now();

  const insert = await messagesModel.create({ userID, messageText, timeStamp });

  return { responseMessage: insert, statusCode: 201 };
};

module.exports = {
  create,
};