const Tasks = require('../models/taskModel');
const Log = require('../models/logModel');
const Schedule = require('../models/scheduleModel');

const mierateAll = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    console.log(tasks.length, tasks[0]);

    res.json({ message: 'данные успешно мигрированы' });
  } catch (err) {
    console.error(`Ошибка миграции : ${err}`);
  }
};

module.exports = { mierateAll };
