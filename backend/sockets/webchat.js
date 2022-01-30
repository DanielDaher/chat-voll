const { createMessage } = require("./services");

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;

  socket.on('message', async ({ message, token }) => await createMessage({ message, token, socket, io }));

  /* socket.on('disconnect', () => {
    const filteredNicknames = nicknames.filter((user) => user.id !== id);

    nicknames = filteredNicknames;
    returnNicknames({ io, nicknames });
  }); */

  /* socket.on('generateNickname', () => socket.emit('generateNickname', id)); */
});