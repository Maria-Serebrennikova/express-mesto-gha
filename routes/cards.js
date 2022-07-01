const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regular = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regular),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    cardID: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardID: Joi.string().hex().length(24).required(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardID: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

module.exports = router;
