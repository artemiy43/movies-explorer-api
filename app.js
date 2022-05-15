const express = require('express');

const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

require('dotenv').config();

const app = express();

const allowedCors = [
  'https://movies.bondar.student.nomoredomains.xyz',
  'http://movies.bondar.student.nomoredomains.xyz',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
});
app.use(requestLogger);
app.use(helmet());
require('./utils/limiter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

require('./routes/index')(app);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
