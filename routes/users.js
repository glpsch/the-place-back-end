// const routerUsers = require('express').Router();
// const users = require('../data/users.json');

// routerUsers.get('/', (req, res) => {
//   res.json(users);
// });

// routerUsers.get('/:id', (req, res) => {
//   const { id } = req.params;

//   const foundUser = users.find(({ _id }) => _id === id);

//   if (!foundUser) {
//     res.status(404).send({ message: 'Нет пользователя с таким id' });
//     return;
//   }

//   res.send(foundUser);
// });

// module.exports = routerUsers;

const routerUsers = require('express').Router();
const { getAllUsers, createUser /* , getUserById */ } = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.post('/', createUser);
// router.get('/:userId', getUserById);

module.exports = routerUsers;
