const routerCards = require('express').Router();
const cards = require('../data/cards.json');

routerCards.get('/', (req, res) => {
  res.json(cards);
});

module.exports = routerCards;
