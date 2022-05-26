const DEFAULT_ERROR_CODE = require('../errors/errors');

const errorsHandler = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR_CODE, message} = err;

  res.status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR_CODE
        ? 'На сервере что-то пошло не так!'
        : message,
    })
}

module.exports = errorsHandler;
