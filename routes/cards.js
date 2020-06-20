
const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getAllCards, createCard, deleteCard } = require('../controllers/cards');

routerCards.get('/', getAllCards);
routerCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), createCard);
routerCards.delete('/:cardId', deleteCard);

module.exports = routerCards;
