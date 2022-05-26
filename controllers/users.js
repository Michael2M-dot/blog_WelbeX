const bcrypt = require('bcryptjs');
const ValidationErr = require('../errors/validation-err');
const User = require('../models/user.model');
const {
  errEmailOrPasswordEmpty,
  errPasswordMinLengthError,
  ResourceExistErr,
  errUserEmailAlreadyExist,
  CREATE_RESOURCE_SUCCESS_CODE,
} = require('../errors/errors');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password
  } = req.body;

  if (req.body==={}) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log(req.body);

  User.create({
      userName: "Michael",
      email: "zjdfb@slkdfn.ru",
      hashedPassword: "!Qwerty123",
    })
    .then((user) => {
      res.status(CREATE_RESOURCE_SUCCESS_CODE)
        .send({
          _id: user.id,
          email: user.email,
          name: user.userName,
        })
    })
    .catch((err) => {
      console.log(`${err}`)

      return next(err);
    })
}


//создает пользователя в БД
// module.exports.createUser = (req, res, next) => {
//   const {
//     name,
//     email,
//     password
//   } = req.body;
//
//   if (!email || !password) {
//     throw new ValidationErr(errEmailOrPasswordEmpty);
//   }
//
//   if (password.length < 8) {
//     throw new ValidationErr(errPasswordMinLengthError);
//   }
//
//   User.findAll(email)
//     .then((user) => {
//       if (user) {
//         throw new ResourceExistErr(errUserEmailAlreadyExist);
//       }
//
//       console.log("opa");
//       return bcrypt.hash(password, 10);
//     })
//     .then((hash) => User.create({
//       userName: name,
//       email: email,
//       hashedPassword: hash,
//     }))
//     .then((user) => {
//       res.status(CREATE_RESOURCE_SUCCESS_CODE)
//         .send({
//           _id: user.id,
//           email: user.email,
//           name: user.userName,
//         })
//     })
//     .catch((err) => {
//       console.log(`${err}`)
//
//       return next(err);
//     })
// }

// //авторизация пользователя
// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//
//   if (!email || !password) {
//     next(new ValidationErr(errEmailOrPasswordEmpty));
//   }
// }
//
// //выход из приложения
// module.exports.logout = (req, res, next) => {
//
// }

