const express = require('express');
const path = require('path');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT);


app.use(express.static(path.join(__dirname, 'public')));

const routerCards = require('./routes/cards.js');
const routerUsers = require('./routes/users.js');


app.use('/cards', routerCards);
app.use('/users', routerUsers);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
