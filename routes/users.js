const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUserData,
} = require('../controllers/users');

// получаем данные всех пользователей
router.get('/users', getUsers);

//получаем данные пользователя
router.get('/users/:id', getUser);

// изменяем данные пользователя
// router.patch('/users/me', validateUserUpdateData, updateUserData);
router.patch('/users/:id', updateUserData);

module.exports = router;
