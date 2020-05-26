const validate = require('mongoose-validator');

const urlValidator = validate({
  validator: 'isURL',
  message: 'Здесь должна быть ссылка',
});

module.exports = urlValidator;
