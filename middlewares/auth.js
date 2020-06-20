const jwt = require('jsonwebtoken');
const { JWT_DEV } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

// const token = jwt.sign(
//   { _id: user._id },
//   NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
// );

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
    // payload = jwt.verify(token, JWT_DEV);
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV);
  } catch (err) {
    handleAuthError(res);
  }

  req.user = payload;

  next();
};
