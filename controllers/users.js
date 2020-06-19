
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_DEV } = require('../config');
const { BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  ForbiddenError } = require('../errors/errors');


module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    // .catch((err) => res.status(500).send({ message: err.message }));
    .catch(next);
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.init()
    .then(() => {
      if (!password || password.length < 6) {
        return Promise.reject(new Error('Длина пароля должна быть не менее 6 символов'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user.omitPrivate() }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.message === 'Длина пароля должна быть не менее 6 символов') {
        return res.status(400).send({ message: err.message });
      }
      if (err.code === 11000) {
        return res.status(409).send({ message: 'Пользователь с таким адресом почты уже существует' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Не найдено пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      // console.error('in catch:', err.name);
      let error = err;
      if (err.name === 'CastError') {
        error = new BadRequestError('Некорректный запрос');
      }
      next(error);
    });
};



module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_DEV, { expiresIn: '7d' });
      // res.send({ token });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: `Привет, ${user.name}` });
    })
    .catch((err) => {
      if (err.name === 'JsonWebTokenError' || err.name === 'Error') {
        return res.status(401).send({ message: 'Ошибка аутентификации' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
      // return res.status(500).send({ message: err.name });
    });
};
