const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const AuthError = require('../errors/auth-err');
const {
  errWrongToken,
  errTokenEmpty
} = require('./errors');

const authHandler = (req, res, next) => {
  const token = req.cookie.jwt;

  if(!token) {
   return next(new AuthError(errTokenEmpty));
  }

  let payload;

  try{
    payload = jwt.verify (
      token,
      JWT_SECRET
    );
  } catch (err) {
    next(new AuthError(errWrongToken));
  }

  req.user = payload;

  return next();
}

module.exports = authHandler;
