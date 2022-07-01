const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regular = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;

const {
  getUsers,
  getUserByID,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserByID);

router.get('/users/me', getMe);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().pattern(regular),
  }),
}), updateAvatar);

module.exports = router;
