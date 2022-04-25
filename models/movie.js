const mongoose = require('mongoose');

const urlExample = /(http|https):\/\/(www\.)?[-a-zA-Z0-9]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%._\\+~#?&//=]*)/;
// @:%._\\+~#=
const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства age
        if (!urlExample.test(v)) {
          return false;
        }
        return v;
      },
      message: 'It is not URL', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства age
        if (!urlExample.test(v)) {
          return false;
        }
        return v;
      },
      message: 'It is not URL', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства age
        if (!urlExample.test(v)) {
          return false;
        }
        return v;
      },
      message: 'It is not URL', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', userSchema);
