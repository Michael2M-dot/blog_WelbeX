const REGEX_PASSWORD = require('../utils/REGEX');
// const { DataTypes } = require('sequelize');
// const sequelize = require('./db');
// // const REGEX_PASSWORD = require('../utils/REGEX');
//
// const User = sequelize.define('User', {
//   userName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       notNull: {
//         msg: 'Поле "username" должно быть заполнено',
//       },
//       len: {
//         args: [2, 30],
//         msg: `'Минимальная длина поля "name", должна составлять 2 символа,
//         а максимальная - не более 30 символов`
//       }
//     }
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: {
//         msg: 'Поле "email" должно быть валидным email-адресом.',
//       },
//       notNull: {
//         msg: 'Поле "email" должно быть заполнено',
//       }
//     }
//   },
//   hashedPassword: {
//     type: DataTypes.STRING(64),
//     allowNull: false,
//     validate: {
//       len: {
//         args: [8, ],
//         msg: 'Поле "password" должно содержать не менее 8 символов',
//       },
//       is: {
//         args: REGEX_PASSWORD,
//         msg: 'Поле "password" должно соответствовать модели',
//       }
//     }
//   }
// })
//
// module.exports = User;




module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      // identity: true,
      allowNull: false,
      unique: false,
      validate: {
        notNull: {
          msg: 'Поле "username" должно быть заполнено',
        },
        len: {
          args: [2, 30],
          msg: `'Минимальная длина поля "name", должна составлять 2 символа,
        а максимальная - не более 30 символов`
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Поле "email" должно быть валидным email-адресом.',
        },
        notNull: {
          msg: 'Поле "email" должно быть заполнено',
        }
      }
    },
    hashedPassword: {
      type: Sequelize.STRING(64),
      allowNull: false,
      validate: {
        len: {
          args: [8, ],
          msg: 'Поле "password" должно содержать не менее 8 символов',
        },
        is: {
          args: REGEX_PASSWORD,
          msg: 'Поле "password" должно соответствовать модели',
        }
      }
    }
  })

  return User;
}

//
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('./db');
//
// class User extends Model {}
//
// User.init({
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       notNull: {
//         msg: 'Поле "username" должно быть заполнено',
//       },
//       len: {
//         args: [2, 30],
//         msg: `'Минимальная длина поля "name", должна составлять 2 символа,
//        а максимальная - не более 30 символов`
//       }
//     }
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: {
//         msg: 'Поле "email" должно быть валидным email-адресом.',
//       },
//       notNull: {
//         msg: 'Поле "email" должно быть заполнено',
//       }
//     }
//   },
//   hashedPassword: {
//     type: DataTypes.STRING(64),
//     allowNull: false,
//     validate: {
//       len: {
//         args: [8, ],
//         msg: 'Поле "password" должно содержать не менее 8 символов',
//       },
//       is: {
//         args: REGEX_PASSWORD,
//         msg: 'Поле "password" должно соответствовать модели',
//       }
//     }
//   }
// }, {
//   sequelize,
//   modelName: 'user',
// });
//
// module.exports = User;
