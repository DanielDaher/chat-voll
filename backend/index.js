const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const io = require('socket.io')(http, {
  cors: {
    origin: process.env.FRONTEND_URL, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

require('./sockets/webchat')(io);

const usersRoute = require('./Routes/usersRoute');
const messagesRoute = require('./Routes/messagesRoute');
const loginRoute = require('./Routes/loginRoute');

app.use(express.json({
  type: ['application/json', 'text/plain']
})); //https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request

app.options('*', cors()) // include before other routes
app.use(cors());

app.use('/users', usersRoute);

app.use('/messages', messagesRoute);

app.use('/login', loginRoute);

app.get('/', (req, res) => res.send('Hello World!'));
http.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));