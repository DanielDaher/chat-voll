const moment = require('moment');
const validateJWTSocket = require("../auth/validateJWTSocket");
const messagesController = require("../controllers/messagesController");

const timeStamp = moment().format('hh:mm:ss');

const createMessage = async ({ message, token, socket, io }) => {
  const userIsValid = await validateJWTSocket(token);
  if (userIsValid.errorMessage) return socket.emit('invalidToken', userIsValid.errorMessage);

  const { _id, userName } = userIsValid;

  const requisition = { user: { _id }, body: { message, timeStamp } };
  const insertMessageOnDatabase = await messagesController.create(requisition);

  if (insertMessageOnDatabase.responseMessage === 'message inserted on database') {
    const socketMessageResponse = { timeStamp, message, userName };
    return io.emit('message', socketMessageResponse);
  }
};

module.exports = {
  createMessage,
};