const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorConflict = require('../Errors/ErrorConflict');
const NotFoundError = require('../Errors/NotFoundError');
const CastError = require('../Errors/CastError');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  // User.findOne({ email })
  //   .then((user) => {
  //     if (user) {
  //       throw new ErrorConflict(`Пользователь с таким email: ${email} уже зарегестрирован`);
  //     }
  //     return bcrypt.hash(password, 10);
  //   })
  //   .then((hash) => User.create({
  //     name, email, password: hash,
  //   }))
  //   .then((user) => User.findOne({ _id: user._id }))
  //   .then((user) => res.send(user))
  //   .catch(next);
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные пользователя'));
      } if (err.code === 11000) {
        next(new ErrorConflict(`Пользователь с таким email: ${email} уже зарегестрирован`));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports.updateProfileUser = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    {
      name,
      email,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};
