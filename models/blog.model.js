const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Blog = sequelize.define('Blog', {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: DataTypes.TEXT,
})

module.exports = Blog;
