const schedule = require('node-schedule');

const Tasks = require('../models/taskModel');
const Schedule = require('../models/scheduleModel');
const scheduleController = require('../controllers/scheduleController');
const importDataScheduler = require('./importDataScheduler');

const scheduleAutorun = async () => {
  // получаем массив расписаний с id задачи
  const schedulesFromDB = await Schedule.findAll();

  schedulesFromDB.forEach((data) => {
    const { timing, idTask, _id } = data;
    const nameJob = _id.toString(); // даем имя задачи что бы потом ее можно было отследать по имени
    // создаем задачу и добавлемм ее в глобальную переменную
    const newJob = schedule.scheduleJob(nameJob, timing, async () => {
      const dataTask = await Tasks.findByPk(idTask);
      console.log(data.idTask, dataTask.taskText, nameJob, new Date());
      // запускаем тот импорт в зависимости от параметров
      importDataScheduler(dataTask);
    });
    scheduleController.jobList.push(newJob);
  });
};

module.exports = scheduleAutorun;
