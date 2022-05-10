const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const urlExample = /(http|https):\/\/(www\.)?[-a-zA-Z0-9]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%._\\+~#?&//=]*)/;

const createUserCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.message('It is not Email');
      }
      return value;
    }),
    password: Joi.string().required(),
  }),
});

const loginCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.message('It is not Email');
      }
      return value;
    }),
    password: Joi.string().required(),
  }),
});

const updateProfileUserCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.message('It is not Email');
      }
      return value;
    }),
  }),
});

const movieIdCheck = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

const createMovieCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (!urlExample.test(value)) {
        return helper.message('It is not url');
      }
      return value;
    }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (!urlExample.test(value)) {
        return helper.message('It is not url');
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (!urlExample.test(value)) {
        return helper.message('It is not url');
      }
      return value;
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  createUserCheck,
  loginCheck,
  updateProfileUserCheck,
  movieIdCheck,
  createMovieCheck,
};
