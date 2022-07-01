const jwt = require('jsonwebtoken');
const Unathorized = require('../errors/Unathorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return new Unathorized('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new Unathorized('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
