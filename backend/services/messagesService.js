const messagesModel = require('../models/messagesModel');

const create = async ({ userID, message }) => {
  try {
    const timeStamp = Date.now();

    const insert = await messagesModel.create({ userID, message, timeStamp });

    return { responseMessage: insert, statusCode: 201 };
  } catch (error) {
    console.error(error);
    return { responseMessage: error, statusCode: 400 };
  }
};

module.exports = {
  create,
};