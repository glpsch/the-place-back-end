const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const routerCards = require('./routes/cards.js');
const routerUsers = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();
app.listen(PORT);

//
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
//


app.use(express.static(path.join(__dirname, 'public')));


app.use('/cards', routerCards);
app.use('/users', routerUsers);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
