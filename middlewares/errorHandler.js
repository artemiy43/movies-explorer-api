const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  // const messagge = err.message || 'Ошибка на стороне сервера';
  res.status(status).send({
    message: (status === 500) ? 'Ошибка на стороне сервера' : err.message,
  });
  next();
};

module.exports = errorHandler;
