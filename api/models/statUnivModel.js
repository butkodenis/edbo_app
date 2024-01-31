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

const StatUniv = sequelize.define(
  'StatUnivs',
  {
    usid: { type: DataTypes.INTEGER },
    usn: { type: DataTypes.STRING },
    ustn: { type: DataTypes.STRING },
    uid: { type: DataTypes.INTEGER },
    un: { type: DataTypes.STRING },
    ufn: { type: DataTypes.STRING },
    rk: { type: DataTypes.STRING },
    qid: { type: DataTypes.STRING },
    qn: { type: DataTypes.STRING },
    ebid: { type: DataTypes.INTEGER },
    ebn: { type: DataTypes.STRING },
    efid: { type: DataTypes.INTEGER },
    efn: { type: DataTypes.STRING },
    cid: { type: DataTypes.INTEGER },
    ssc: { type: DataTypes.STRING },
    ssn: { type: DataTypes.STRING },
    etrm: { type: DataTypes.STRING },
    rtrm: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    xprice: { type: DataTypes.STRING },
    up: { type: DataTypes.INTEGER },
    spn: { type: DataTypes.STRING },
    ox: { type: DataTypes.INTEGER },
    ol: { type: DataTypes.INTEGER },
    oc: { type: DataTypes.INTEGER },
    rr: { type: DataTypes.INTEGER },
    osn: { type: DataTypes.JSONB },
    os: { type: DataTypes.JSONB },
    st: { type: DataTypes.JSONB },
    year: { type: DataTypes.INTEGER },
    timeCreation: { type: DataTypes.DATE },
    idTask: { type: DataTypes.STRING },
    idJob: { type: DataTypes.INTEGER },
  },
  {
    tableName: 'statUnivs', // Название таблицы в базе данных PostgreSQL
    timestamps: false, // Отключение полей created_at и updated_at
  },
);

module.exports = StatUniv;
