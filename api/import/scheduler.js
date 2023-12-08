// scheduler.js
const cron = require('node-cron');

const tasks = [
  { schedule: '* * * * *', task: 'Задача 1 выполняется каждую минуту' },
  { schedule: '30 12 * * *', task: 'Задача 2 выполняется каждый день в 12:30 PM' },
  // Добавьте сколько угодно задач
];

tasks.forEach((task) => {
  cron.schedule(task.schedule, () => {
    console.log(task.task);
  });
});
