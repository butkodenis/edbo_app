const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  },
);

const Schedule = sequelize.define(
  'Schedule',
  {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    timing: { type: DataTypes.STRING },
    idTask: { type: DataTypes.STRING },
  },
  {
    tableName: 'schedules', // Название таблицы в базе данных PostgreSQL
    timestamps: false, // Отключение полей created_at и updated_at
  },
);

module.exports = Schedule;
