const express = require('express');
// var path = require('path');
const { openConnection, closeConnection, syncDB }= require('./models/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const errorsHandler = require('./middlewares/errors');
const { PORT = 3000 } = process.env;
// const PORT = 3000;
const app = express();

// db.sequelize
//   .then(() => {
//     openConnection();
//     closeConnection();
//   })
//   .then(() => {
//     console.log('Все модели были успешно синхронизированы.');
//   })


// db.sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Соединение с БД было успешно установлено');
//   })
//   .catch(err => {
//     console.error('Невозможно выполнить подключение к БД: ', err);
//   });



app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(router);
app.use(errorsHandler);

async function bootDB() {
  try {
    await syncDB();

    await openConnection();

    // await closeConnection();

  } catch (err) {
    console.error('Проблема при работе с БД', err)
  }
}

bootDB();

app.listen(PORT, () => {
  console.log(`CORS-enable web server listening on port ${PORT}`)
})


// const createError = require('http-errors');
// const logger = require('morgan');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// module.exports = app;
