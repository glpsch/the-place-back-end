const routerUsers = require('express').Router();
const users = require('../data/users.json');

routerUsers.get('/', (req, res) => {
  res.json(users);
});

routerUsers.get('/:id', (req, res) => {
  const { id } = req.params;

  const match = users.find(({ _id }) => _id === id);
  // console.log(match);

  if (!match) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }

  res.send(match);
});

module.exports = routerUsers;
