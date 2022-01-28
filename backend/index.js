const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const usersRoute = require('./Routes/usersRoute');
const messagesRoute = require('./Routes/messagesRoute');

app.use(express.json({
  type: ['application/json', 'text/plain']
})); //https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request

app.use('/users', usersRoute);

app.use('/messages', messagesRoute);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));