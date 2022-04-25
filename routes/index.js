const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../Errors/NotFoundError');

module.exports = (app) => {
  app.use('/', usersRouter);
  app.use('/', moviesRouter);
  app.all('*', (req, res, next) => {
    next(new NotFoundError('Запрашиваемый ресурс не найден'));
  });
};
