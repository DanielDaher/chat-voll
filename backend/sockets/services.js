const validateJWTSocket = require("../auth/validateJWTSocket");
const messagesController = require("../controllers/messagesController");

const createMessage = async ({ message, token, socket, io }) => {
  const userIsValid = await validateJWTSocket(token);
  if (userIsValid.errorMessage) return socket.emit('invalidToken', userIsValid.errorMessage);

  const { user } = userIsValid.user;

  const requisition = { user, body: message };
  const insertMessageOnDatabase = await messagesController.create(requisition);

  if (insertMessageOnDatabase.responseMessage === 'message inserted on database') {
    const socketMessageResponse = { timeStamp, message, user };
    return io.emit('message', socketMessageResponse);
  }
};

module.exports = {};