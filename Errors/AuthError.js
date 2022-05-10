class AuthError extends Error {
  constructor(message = 'Неверные почта или пароль') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AuthError;
