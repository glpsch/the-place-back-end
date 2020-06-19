const Card = require('../models/card');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/errors');


module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};


module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      let error = err;
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        error = new BadRequestError('Некорректный запрос');
      }
      next(error);
    });
};


module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Не найдено карточки с таким id');
      // eslint-disable-next-line eqeqeq
      } else if (card.owner == req.user._id) {
        card.remove(req.params.cardId);
        res.status(200).send({ message: 'Карточка успешно удалена' });
      } else {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
    })
    .catch((err) => {
      let error = err;
      if (err.name === 'CastError') {
        error = new BadRequestError('Некорректный запрос');
      }
      next(error);
    });
};
