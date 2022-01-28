const express = require('express');
const app = express();
const PORT = 3001;

/* const authorsRoute = require('./routes/authorsRoute');
const booksRoute = require('./routes/booksRoute'); */

app.use(express.json({
  type: ['application/json', 'text/plain']
})); //https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request

/* app.use('/authors', authorsRoute);

app.use('/books', booksRoute); */

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));