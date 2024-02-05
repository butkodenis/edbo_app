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

const Log = sequelize.define(
  'Log',
  {
    idTask: { type: DataTypes.STRING },
    task: { type: DataTypes.STRING },
    taskText: { type: DataTypes.STRING },
    info: { type: DataTypes.STRING },
    amount: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
    timeCreation: { type: DataTypes.DATE },
    idJob: { type: DataTypes.INTEGER },
  },
  {
    tableName: 'log', // Название таблицы в базе данных PostgreSQL
    timestamps: false, // Отключение полей created_at и updated_at});
  },
);

module.exports = Log;
