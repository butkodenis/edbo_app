const Tasks = require('../../models/taskModel');
const StatUniv = require('../../models/statUnivModel');
const saveLog = require('./saveLog');

const saveStatUniv = async (data, idJob, dataTask) => {
  try {
    const { _id } = dataTask;

    // добавляем время импорта и код выполяемой задачи
    const modData = data.map((item) => ({
      ...item,
      timeCreation: new Date(),
      idJob,
      idtask: _id,
    }));

    const result = await StatUniv.insertMany(modData);

    // обновляем время импорта задачи в БД
    await Tasks.updateOne({ _id }, { $set: { timeCompleted: new Date(), status: 'Виконано' } });

    // записуем в лог
    const message = `імпортовано : ${result.length} пропозицій`;
    await saveLog(dataTask, idJob, message);
    console.log(message);
  } catch (error) {
    const message = 'Невдале збереження пропозицій (saveStatUniv)';
    await saveLog(dataTask, idJob, message);
    throw new Error('Невдале збереження пропозицій (saveStatUniv)');
  }
};

module.exports = saveStatUniv;
