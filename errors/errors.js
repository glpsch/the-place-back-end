const BadRequestError = require('./error-400');
const UnauthorizedError = require('./error-401');
const NotFoundError = require('./error-404');
const ConflictError = require('./error-409');

module.exports.Errors = {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
};
