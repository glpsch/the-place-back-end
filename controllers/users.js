
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_DEV } = require('../config');
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require('../errors/errors');


module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};


module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.init()
    .then(() => {
      if (!password || password.length < 6) {
        throw new BadRequestError('Длина пароля должна быть не менее 6 символов');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user.omitPrivate() }))
    .catch((err) => {
      let error = err;
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        error = new BadRequestError('Некорректный запрос');
      }
      if (err.code === 11000) {
        error = new ConflictError('Пользователь с таким адресом почты уже существует');
      }
      next(error);
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


module.exports.login = (req, res, next) => {
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
      let error = err;
      if (err.name === 'JsonWebTokenError' || err.name === 'Error') {
        error = new UnauthorizedError('Ошибка авторизации');
      }
      next(error);
    });
};
