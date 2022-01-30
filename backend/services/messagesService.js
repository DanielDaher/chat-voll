const messagesModel = require('../models/messagesModel');

const create = async ({ userID, messageText }) => {
  try {
    const timeStamp = Date.now();

    const insert = await messagesModel.create({ userID, messageText, timeStamp });

    return { responseMessage: insert, statusCode: 201 };
  } catch (error) {
    console.error(error);
    return { responseMessage: error, statusCode: 400 };
  }
};

module.exports = {
  create,
};