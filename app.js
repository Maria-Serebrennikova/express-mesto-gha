const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '62aae1820e1a8f9cd832d2d9',
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Непредвиденная ошибка' });
});

app.listen(PORT);
