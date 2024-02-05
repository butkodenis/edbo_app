const StatUniv = require('../../models/statUnivModel');
const saveLog = require('./saveLog');
const updateTask = require('./updateTask');

const saveStatUniv = async (data, idJob, dataTask) => {
  try {
    const { id, year } = dataTask;

    // добавляем время импорта и код выполяемой задачи
    const modData = data.map((item) => ({
      ...item,
      timeCreation: new Date(),
      idJob,
      idTask: id,
      year,
    }));

    const result = await StatUniv.bulkCreate(modData);

    // обновляем время импорта задачи, статус в БД
    const status = 'Виконано';
    await updateTask(dataTask, status);

    // сохраняем в лог
    const message = `імпортовано : ${result.length} пропозицій по ${dataTask.speciality}`;
    const amount = result.length;
    saveLog(dataTask, idJob, message, status, amount);
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
