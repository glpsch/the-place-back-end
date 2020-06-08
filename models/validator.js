const validate = require('mongoose-validator');

const urlValidator = validate({
  validator: 'isURL',
  message: 'Здесь должна быть ссылка',
});

const emailValidator = validate({
  validator: 'isEmail',
  message: 'Введите корректный адрес электронной почты',
});

// const passValidator = validate({
//   validator: 'isLength',
//   arguments: [6],
//   message: 'Длина пароля должна быть не менее {ARGS[0]} символов',
// });


module.exports = { urlValidator, emailValidator };
