
//


const User = require('../models/user');


module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  // console.log('reqb', req.body)
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};


// module.exports.getUserById = (req, res) => {
//   User.find({})
//     .then(users => res.send({ data: users }))
//     .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
// };

