const StatUniv = require('../../models/statUnivModel');
const saveLog = require('./saveLog');
const updateTask = require('./updateTask');

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

    // обновляем время импорта задачи, статус в БД
    const status = 'Виконано';
    await updateTask(dataTask, status);

    // сохраняем в лог
    const message = `імпортовано : ${result.length} пропозицій по ${dataTask.speciality}`;
    saveLog(dataTask, idJob, message, status);
  } catch (error) {
    // обновляем время импорта ошибки задачи, статус в БД
    const status = 'Помилка';
    await updateTask(dataTask, status);

    // сохраняем в лог
    const message = `Невдале збереження пропозицій (saveStatUniv), ${error.message}`;
    saveLog(dataTask, idJob, message, status);

    throw new Error('Невдале збереження статистики пропозицій (saveStatUniv)');
  }
};

module.exports = saveStatUniv;
