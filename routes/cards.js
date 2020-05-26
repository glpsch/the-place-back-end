// const routerCards = require('express').Router();
// const cards = require('../data/cards.json');

// routerCards.get('/', (req, res) => {
//   res.json(cards);
// });

// module.exports = routerCards;

const routerCards = require('express').Router();
const { getAllCards, createCard, deleteCard } = require('../controllers/cards');

routerCards.get('/', getAllCards);
routerCards.post('/', createCard);
routerCards.get('/:cardId', deleteCard);

module.exports = routerCards;
