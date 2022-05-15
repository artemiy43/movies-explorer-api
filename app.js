const express = require('express');

const mongoose = require('mongoose');
const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
// const {
//   createUser, login,
// } = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/Logger');
// const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
// const { createUserCheck, loginCheck } = require('./middlewares/JoiCheck');

const { PORT = 3000 } = process.env;

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

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
// app.use(limiter);
require('./utils/limiter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

// app.use(requestLogger);
// app.post('/api/signin', loginCheck, login);
// app.post('/api/signup', createUserCheck, createUser);

// app.use(auth);

require('./routes/index')(app);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
