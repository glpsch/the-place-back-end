
const routerCards = require('express').Router();
const { getAllCards, createCard, deleteCard } = require('../controllers/cards');

routerCards.get('/', getAllCards);
routerCards.post('/', createCard);
routerCards.delete('/:cardId', deleteCard);

module.exports = routerCards;
