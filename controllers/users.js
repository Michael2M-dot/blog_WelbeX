const bcrypt = require('bcryptjs');
const db = require('../models/db');
const User = db.users;
const ValidationErr = require('../errors/validation-err');
const ResourceExistErr = require('../errors/resourceExistError');
const NotFoundErr = require('../errors/not-found-err');

const {
  errEmailOrPasswordEmpty,
  errPasswordMinLengthError,
  errUserEmailAlreadyExist,
  CREATE_RESOURCE_SUCCESS_CODE,
  VALIDATION_ERROR,
  COMMON_SUCCESS_CODE,
  errWrongUserData,
  errUserIdEmpty,
  errWrongUserId,
  errNameOrEmailEmpty,
  errUserWithIdNotExist,
  ERROR_MESSAGE
} = require('../errors/errors');

//создает пользователя в БД
module.exports.createUser = (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body;

  if (!email || !password) {
    throw new ValidationErr(errEmailOrPasswordEmpty);
  }

  if (password.length < 8) {
    throw new ValidationErr(errPasswordMinLengthError);
  }

  User.findOne({where: {email: email}})
    .then((user) => {
      if (user) {
        throw new ResourceExistErr(errUserEmailAlreadyExist);
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      username: username,
      email: email,
      hashedPassword: hash,
    }))
    .then((user) => {
      res.status(CREATE_RESOURCE_SUCCESS_CODE)
        .send({
          _id: user.id,
          email: user.email,
          name: user.username,
        })
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new ValidationErr(
          `${errWrongUserData}: ${ERROR_MESSAGE(err)}`,
        ));
      }
      console.log(`${err}`)

      return next(err);
    })
}

module.exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((users) =>{
      console.log('getUsers', 'opa');
      res.status(COMMON_SUCCESS_CODE).send(users);
    })
    .catch((err) => next(err));
}

// получаем данные пользователя
module.exports.getUser = (req, res, next) => {
  const userId = + req.params.id;
  console.log(req.params);

  if(!userId) {
    throw new ValidationErr(errUserIdEmpty);
  }

  if(typeof userId == "string") {
    throw new ValidationErr(errWrongUserId);
  }

  User.findOne({ where: { id: userId }})
    .then((user) => {
      if(!user) {
        throw new NotFoundErr(errUserWithIdNotExist)
      }

      res.status(COMMON_SUCCESS_CODE).send({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    })
    .catch((err) => {
      next(err);
    })
}

// обновляем данные пользователя
module.exports.updateUserData = (req, res, next) => {
  const { username, email } = req.body;
  console.log(req.body)
  const userId = + req.params.id;

  if (!userId) {
    throw new ValidationErr(errUserIdEmpty);
  }

  if(typeof userId == "string") {
    throw new ValidationErr(errWrongUserId);
  }

  if (!username || !email) {
    throw new ValidationErr(errNameOrEmailEmpty);
  }

  User.findOne({ where: { id: userId }})
    .then((user) => {
      console.log(user);
      if(!user) {
        throw new NotFoundErr(errUserWithIdNotExist)
      }

      user.username = username;
      user.email = email;
      return user;
  })
    .then((newUserData) => {
      console.log(newUserData);
      newUserData.save()
      res.status(COMMON_SUCCESS_CODE).send({
        id: newUserData.id,
        username: newUserData.username,
        email: newUserData.email,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    })

}

//авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new ValidationErr(errEmailOrPasswordEmpty));
  }
}

//выход из приложения
module.exports.logout = (req, res, next) => {
}

