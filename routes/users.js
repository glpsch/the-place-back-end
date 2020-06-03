// const routerUsers = require('express').Router();
// const users = require('../data/users.json');

// routerUsers.get('/', (req, res) => {
//   res.json(users);
// });

const routerUsers = require('express').Router();
const { getAllUsers, createUser, getUserById } = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.post('/', createUser);
routerUsers.get('/:userId', getUserById);

module.exports = routerUsers;
