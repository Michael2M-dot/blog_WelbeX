require('dotenv').config();

const {
  JWT_SECRET = 'secret_key'
} = process.env;

module.exports = { JWT_SECRET };
