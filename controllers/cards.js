const Card = require('../models/card');
// const {BadRequestError,
//   UnauthorizedError,
//   NotFoundError,
//   ConflictError,
//   ForbiddenError} = require('../errors/errors');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};


module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Не найдено карточки с таким id' });
      // eslint-disable-next-line eqeqeq
      } else if (card.owner == req.user._id) {
        card.remove(req.params.cardId);
        res.status(200).send({ message: 'Карточка успешно удалена' });
      } else {
        res.status(403).send({ message: 'Вы не можете удалить чужую карточку' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};
