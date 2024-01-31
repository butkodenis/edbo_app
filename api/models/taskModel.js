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

const Tasks = sequelize.define(
  'Task',
  {
    year: { type: DataTypes.INTEGER },
    speciality: { type: DataTypes.INTEGER },
    specialityText: { type: DataTypes.STRING },
    qualification: { type: DataTypes.INTEGER },
    qualificationText: { type: DataTypes.STRING },
    educationBase: { type: DataTypes.INTEGER },
    educationBaseText: { type: DataTypes.STRING },
    task: { type: DataTypes.STRING },
    taskText: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    timeCreation: { type: DataTypes.DATE },
    timeCompleted: { type: DataTypes.DATE },
  },
  {
    // Настройки модели, если необходимо
    tableName: 'tasks', // Название таблицы в базе данных PostgreSQL
    timestamps: false, // Отключение полей created_at и updated_at
  },
);

module.exports = Tasks;
