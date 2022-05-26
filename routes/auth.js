const router = require('express').Router();
const auth = require('../middlewares/authHandler');
const {
  login,
  createUser,
  logout
} = require('../controllers/users');

// регистрация пользователя
router.post('/signup', createUser);

// авторизация пользователя
// router.post('/signin', login);

// выход из приложения
// router.post('/signout', auth, logout);

module.exports = router;
