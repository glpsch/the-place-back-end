
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email,
  } = req.body;
  User.init()
    .then(() => bcrypt.hash(req.body.password, 10))
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      if (err.code === 11000) {
        return res.status(409).send({ message: 'Пользователь с таким адресом почты уже существует' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Не найдено пользователя с таким id' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};


module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
      // res
      //   .cookie('jwt', token, {
      //     maxAge: 3600000,
      //     httpOnly: true,
      //     sameSite: true,
      //   });
    })
    .catch((err) => {
      if (err.name === 'JsonWebTokenError' || err.name === 'Error') {
        return res.status(401).send({ message: 'Ошибка аутентификации' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
      // return res.status(500).send({ message: err.name });
    });
};
