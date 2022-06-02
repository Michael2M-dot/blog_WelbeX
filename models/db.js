const dbConfig = require('../config/db.config');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  dialect: dbConfig.dialect,
  host: dbConfig.HOST,
  timezone: '+00.00',
  // operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.blogs = require('./blog.model');
db.users = require('./user.model')(sequelize, Sequelize);

module.exports = db;

module.exports.syncDB = () => {
  db.sequelize
    .sync()
    .then(() => {
      console.log('Все модели были успешно синхронизированы.')
    })
}

module.exports.openConnection = () => {
  db.sequelize
    .authenticate()
    .then(() => {
      console.log('Подключение к БД прошло успешно.')
    })
    .catch((err) => {
      console.log('Невозможно выполнить подключение к БД: ', err)
    })
}

module.exports.closeConnection = () => {
  db.sequelize
    .close()
    .then(() => {
      console.log('Отключение от БД прошло успешно.')
    })
    .catch(err => {
      console.log('Ошибка при отключеии БД.')
    })
}

