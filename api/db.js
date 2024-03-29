const { Sequelize, DataTypes } = require('sequelize');

const Tasks = require('./models/taskModel');
const Universities = require('./models/universitiesModel');
const StatUniv = require('./models/statUnivModel');
const StatStudent = require('./models/statStudModel');
const Log = require('./models/logModel');
const Schedule = require('./models/scheduleModel');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  },
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено успешно.');

    // синхронизация БД
    await Tasks.sync();
    await Universities.sync();
    await StatUniv.sync();
    await StatStudent.sync();
    await Log.sync();
    await Schedule.sync();
  } catch (error) {
    console.error('Ошибка при соединении с базой данных:', error);
  }
};

module.exports = connectToDatabase;
