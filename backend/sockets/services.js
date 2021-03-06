const validateJWTSocket = require("../auth/validateJWTSocket");
const messagesController = require("../controllers/messagesController");

let onlineUsers = [];

const removeOfflineUser = (id, io) => {
  const filteredNicknames = onlineUsers.filter((user) => user.id !== id);
  onlineUsers = filteredNicknames;
  io.emit('online-users', onlineUsers);
}

const showOnlineUsers = async ({ userName, token, socket, id }) => {
  try {
    const userIsValid = await validateJWTSocket(token);
    if (userIsValid.errorMessage) return socket.emit('invalidToken', userIsValid.errorMessage);

    const findUser = onlineUsers.find((user) => user.userName === userName);
    if (!findUser) {
      onlineUsers.push({ userName, id });
      socket.broadcast.emit('online-users', onlineUsers);
    }
  } catch (error) {
    console.error(error);
  }
};

const showWhoIsTyping = async ({ userName, token, io }) => {
  try {
    const userIsValid = await validateJWTSocket(token);
    if (userIsValid.errorMessage) return socket.emit('invalidToken', userIsValid.errorMessage);

    io.emit('userTyping', { userName });
  } catch (error) {
    console.error(error);
  }
};

const createMessage = async ({ message, token, timeStamp, socket, io }) => {
  try {
    const userIsValid = await validateJWTSocket(token);
    if (userIsValid.errorMessage) return socket.emit('invalidToken', userIsValid.errorMessage);
  
    const { _id, userName } = userIsValid;
  
    const requisition = { user: { _id, userName }, body: { message, timeStamp } };
    const insertMessageOnDatabase = await messagesController.create(requisition);
  
    if (insertMessageOnDatabase.responseMessage === 'message inserted on database') {
      const socketMessageResponse = { timeStamp, message, userName };
      return io.emit('message', socketMessageResponse);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createMessage,
  showOnlineUsers,
  removeOfflineUser,
  showWhoIsTyping,
};