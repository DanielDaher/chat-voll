module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;

  socket.on('userNickname', ({ nickname, action }) => emitNicknames({ io, id, nickname, action }));

  socket.on('message', async ({ chatMessage: message, nickname }) => {
    await messagesController.createMessage({ message, nickname, timestamp });
    io.emit('message', `${timestamp} - ${nickname}: ${message}`);
  });

  socket.on('disconnect', () => {
    const filteredNicknames = nicknames.filter((user) => user.id !== id);

    nicknames = filteredNicknames;
    returnNicknames({ io, nicknames });
  });

  socket.on('generateNickname', () => socket.emit('generateNickname', id));
});