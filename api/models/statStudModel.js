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

const StatStudent = sequelize.define(
  'statstudents',
  {
    prid: { type: DataTypes.INTEGER },
    n: { type: DataTypes.INTEGER },
    prsid: { type: DataTypes.INTEGER },
    ptid: { type: DataTypes.INTEGER },
    fio: { type: DataTypes.STRING },
    pa: { type: DataTypes.INTEGER },
    d: { type: DataTypes.INTEGER },
    artid: { type: DataTypes.INTEGER },
    kv: { type: DataTypes.INTEGER },
    p: { type: DataTypes.STRING },
    rss: { type: DataTypes.ARRAY(DataTypes.JSONB) },
    year: { type: DataTypes.INTEGER },
    timeCreation: { type: DataTypes.DATE },
    idTask: { type: DataTypes.STRING },
    idJob: { type: DataTypes.INTEGER },
  },
  {
    tableName: 'statstudents', // Название таблицы в базе данных PostgreSQL
    timestamps: false, // Отключение полей created_at и updated_at
  },
);

module.exports = StatStudent;
