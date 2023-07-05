const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const ToDos = db.define('todos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
   title: {
        type: DataTypes.STRING,
        allowNull: false,
   },
   description: {
        type: DataTypes.STRING,
        allowNull: false,
   },
   completed: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
   },
}, {
    timestamps: false,
});

module.exports = ToDos;