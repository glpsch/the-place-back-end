const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { PORT, DATABASE_URL } = require('./config');
const routerCards = require('./routes/cards.js');
const routerUsers = require('./routes/users.js');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
app.listen(PORT);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


app.post('/signin', login);
app.post('/signup', createUser);

app.use(cookieParser());
app.use(auth);

app.use('/cards', routerCards);
app.use('/users', routerUsers);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
