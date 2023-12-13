// scheduler.js

const cron = require('node-cron');
const schedule = require('node-schedule');
const importData = require('./importData');
const Tasks = require('../models/taskModel');
const Schedule = require('../models/scheduleModel');

const scheduleTasks = async () => {
  const listJob = await Schedule.find({});
  console.log(listJob);

  listJob.forEach((job) => {
    cron.schedule(job.schedule, async () => {
      const dataTask = await Tasks.findById(job.idTask);
      console.log(job.idTask, dataTask.taskText);
    });
  });
};

module.exports = scheduleTasks;
