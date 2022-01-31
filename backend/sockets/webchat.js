const { createMessage, showOnlineUsers, removeOfflineUser } = require("./services");

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;

  socket.on('message', async ({ message, token }) => await createMessage({ message, token, socket, io }));

  socket.on('online-users', async ({ userName, token }) => await showOnlineUsers({ userName, token, socket, id }));

  socket.on('disconnect', (userName) => removeOfflineUser(id, io));
});