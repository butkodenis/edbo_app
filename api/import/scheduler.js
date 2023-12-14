const schedule = require('node-schedule');

const importData = require('./importData');
const Tasks = require('../models/taskModel');
const Schedule = require('../models/scheduleModel');
const scheduleController = require('../controllers/scheduleController');

// в зависимости от парметров задачи запускам нужняю ф-ю
const importDataScheduler = async (dataTask) => {
  switch (dataTask.task) {
    case 'saveIds':
      await importData.importUniversities(dataTask);
      break;
    case 'saveStat':
      await importData.importStatUniv(dataTask);
      break;
    case 'saveStud':
      await importData.importStatStudent(dataTask);
      break;
    case 'saveAll':
      await importData.importAll(dataTask);
      break;
    default:
      throw new Error('Помилковi параметри');
  }
};

const scheduleAutorun = async () => {
  // получаем массив засписаний с id задачи
  const schedulesFromDB = await Schedule.find({});

  schedulesFromDB.forEach((data) => {
    const { timing, idTask, _id } = data;
    const nameJob = _id.toString(); // даем имя задачи что бы потом ее можно было отследать по имени
    // создаем задачу и добавлемм ее в
    const newJob = schedule.scheduleJob(nameJob, timing, async () => {
      const dataTask = await Tasks.findById(idTask);
      console.log(data.idTask, dataTask.taskText, nameJob, new Date());
    });
    scheduleController.jobList.push(newJob);
  });
};

module.exports = scheduleAutorun;
