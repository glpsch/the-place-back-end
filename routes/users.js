// const routerUsers = require('express').Router();
// const users = require('../data/users.json');

// routerUsers.get('/', (req, res) => {
//   res.json(users);
// });

const routerUsers = require('express').Router();
const { getAllUsers, getUserById } = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:userId', getUserById);

module.exports = routerUsers;
