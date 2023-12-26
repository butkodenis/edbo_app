const { Sequelize, DataTypes } = require('sequelize');
const Tasks = require('../models/taskModel');
const Log = require('../models/logModel');
const Schedule = require('../models/scheduleModel');
const StatStudent = require('../models/statStudModel');
const StatUniv = require('../models/statUnivModel');
const Universities = require('../models/universitiesModel');
//
const sequelize = new Sequelize('edbo', 'admin', '123456', {
  host: '10.101.10.100',
  dialect: 'postgres',
});

// Проверка соединения с базой данных
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено успешно.');
  } catch (error) {
    console.error('Ошибка при соединении с базой данных:', error);
  }
})();

// Определение модели для таблицы в PostgreSQL
const TaskPostgres = sequelize.define(
  'Task',
  {
    year: {
      type: DataTypes.INTEGER,
    },
    speciality: {
      type: DataTypes.INTEGER,
    },
    specialityText: {
      type: DataTypes.STRING,
    },
    qualification: {
      type: DataTypes.INTEGER,
    },
    qualificationText: {
      type: DataTypes.STRING,
    },
    educationBase: {
      type: DataTypes.INTEGER,
    },
    educationBaseText: {
      type: DataTypes.STRING,
    },
    task: {
      type: DataTypes.STRING,
    },
    taskText: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    timeCreation: {
      type: DataTypes.DATE,
    },
    timeCompleted: {
      type: DataTypes.DATE,
    },
  },
  {
    // Настройки модели, если необходимо
    tableName: 'tasks', // Название таблицы в базе данных PostgreSQL
    timestamps: false, // Отключение полей created_at и updated_at
  },
);

const UniversitiesPostgres = sequelize.define(
  'Universities',
  {
    uid: {
      type: DataTypes.INTEGER,
    },
    un: {
      type: DataTypes.STRING,
    },
    ids: {
      type: DataTypes.STRING,
    },
    n: {
      type: DataTypes.INTEGER,
    },
    timeCreation: {
      type: DataTypes.DATE,
    },
    idTask: {
      type: DataTypes.STRING,
    },
    idJob: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // Настройки модели, если необходимо
    tableName: 'universities', // Название таблицы в базе данных PostgreSQL
    timestamps: false, // Отключение полей created_at и updated_at
  },
);

const mierateAll = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    const logs = await Log.find();
    //const shedules = await Schedule.find();
    //const statStudents = await StatStudent.distinct('f');
    //const statUniversities = await StatUniv.find();
    const universities = await Universities.find();

    console.log(tasks.length, tasks[0]);
    console.log(logs.length);
    console.log(universities.length);
    //console.log(statStudents.length);

    // Синхронизация модели с базой данных
    await TaskPostgres.sync({ force: true });
    await UniversitiesPostgres.sync({ force: true });

    // eslint-disable-next-line no-restricted-syntax
    for (const task of tasks) {
      // eslint-disable-next-line no-await-in-loop
      await TaskPostgres.create({
        year: task.year,
        speciality: task.speciality,
        specialityText: task.specialityText,
        qualification: task.qualification,
        qualificationText: task.qualificationText,
        educationBase: task.educationBase,
        educationBaseText: task.educationBaseText,
        task: task.task,
        taskText: task.taskText,
        status: task.status,
        timeCreation: task.timeCreation,
        timeCompleted: task.timeCompleted,
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const univer of universities) {
      // eslint-disable-next-line no-await-in-loop
      await UniversitiesPostgres.create({
        uid: univer.uid,
        un: univer.un,
        ids: univer.ids,
        n: univer.n,
        timeCreation: univer.timeCreation,
        idTask: univer.idTask,
        idJob: univer.idJob,
      });
    }

    res.json({ message: 'данные успешно мигрированы' });
  } catch (err) {
    console.error(`Ошибка миграции : ${err}`);
  }
};

module.exports = { mierateAll };
