const { createMessage, showOnlineUsers, removeOfflineUser, showWhoIsTyping } = require("./services");

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;

  socket.on('message', async ({ message, token, timeStamp }) => await createMessage({ message, token, timeStamp, socket, io }));

  socket.on('online-users', async ({ userName, token }) => await showOnlineUsers({ userName, token, socket, id }));

  socket.on('userTyping', async ({ userName, token }) => await showWhoIsTyping({ userName, token, io }));

  socket.on('disconnect', (userName) => removeOfflineUser(id, io));
});