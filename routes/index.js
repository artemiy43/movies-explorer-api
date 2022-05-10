const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../Errors/NotFoundError');
const auth = require('../middlewares/auth');
const { createUserCheck, loginCheck } = require('../middlewares/JoiCheck');
const {
  createUser, login,
} = require('../controllers/users');

module.exports = (app) => {
  app.post('/api/signin', loginCheck, login);
  app.post('/api/signup', createUserCheck, createUser);

  app.use(auth);

  app.use('/', usersRouter);
  app.use('/', moviesRouter);
  app.all('*', (req, res, next) => {
    next(new NotFoundError('Запрашиваемый ресурс не найден'));
  });
};
