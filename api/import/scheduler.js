// scheduler.js

const cron = require('node-cron');
const importData = require('./importData');
const Tasks = require('../models/taskModel');
const Schedule = require('../models/scheduleModel');

const scheduleTasks = async () => {
  const tasks = await Schedule.find({});
  console.log(tasks);

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

  tasks.forEach((task) => {
    cron.schedule(task.schedule, async () => {
      const dataTask = await Tasks.findById(task.idTask);
      importDataScheduler(dataTask);
      console.log(task.idTask);

      console.log(dataTask);
    });
  });
};

module.exports = scheduleTasks;
