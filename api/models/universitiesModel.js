const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'postgres',
  },
);

const Universities = sequelize.define(
  'Universities',
  {
    uid: { type: DataTypes.INTEGER },
    un: { type: DataTypes.STRING },
    ids: { type: DataTypes.STRING },
    n: { type: DataTypes.INTEGER },
    timeCreation: { type: DataTypes.DATE },
    idTask: { type: DataTypes.STRING },
    idJob: { type: DataTypes.INTEGER },
    year: { type: DataTypes.INTEGER },
  },
  {
    tableName: 'universities', // Название таблицы в базе данных PostgreSQL
    timestamps: false, // Отключение полей created_at и updated_at
  },
);

module.exports = Universities;
