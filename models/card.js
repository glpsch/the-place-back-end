const mongoose = require('mongoose');
const urlValidator = require('./validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    // url
    validate: urlValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true, /* ? */
  },
});

module.exports = mongoose.model('card', cardSchema);

// link — ссылка на картинку, строка, обязательно поле;
// owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
// likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию
// — пустой массив(поле default)
//   createdAt — дата создания, тип Date, значение по умолчанию Date.now.
