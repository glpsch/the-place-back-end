const jwt = require('jsonwebtoken');
const { JWT_DEV } = require('../config');

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    handleAuthError(res);
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_DEV);
  } catch (err) {
    handleAuthError(res);
  }

  req.user = payload;

  next();
};
