// scheduler.js

const schedule = require('node-schedule');
const importData = require('./importData');
const Tasks = require('../models/taskModel');
const Schedule = require('../models/scheduleModel');
const scheduleController = require('../controllers/scheduleController');

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
