const Tasks = require('../../models/taskModel');
const StatUniv = require('../../models/statUnivModel');
const saveLog = require('../loadData/saveLog');

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

    // получ время последней записи импорта
    const latestDate = await StatUniv.findOne({ idJob }).sort({
      timeCreation: -1,
    });

    // обновляем время импорта задачи в БД
    await Tasks.updateOne(
      { _id },
      { $set: { timeCompleted: latestDate.timeCreation, status: 'Виконано' } },
    );

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
