const StatStudent = require('../../models/statStudModel');
const saveLog = require('./saveLog');
const updateTask = require('./updateTask');

const saveStatStudents = async (data, idJob, dataTask) => {
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

    console.log(modData[88]);
    const result = await StatStudent.bulkCreate(modData);

    // обновляем время импорта задачи, статус в БД
    const status = 'Виконано';
    await updateTask(dataTask, status);

    // сохраняем в лог
    const message = `імпортовано : ${result.length} студентів по ${dataTask.speciality}`;
    saveLog(dataTask, idJob, message, status);
  } catch (error) {
    // обновляем время импорта ошибки задачи, статус в БД
    const status = 'Помилка';
    await updateTask(dataTask, status);

    // сохраняем в лог
    const message = `Невдале збереження  статистики по студентам (saveStatStudents), ${error.message}`;
    saveLog(dataTask, idJob, message, status);

    throw new Error('Невдале збереження  статистики по студентам (saveStatStudents)');
  }
};
module.exports = saveStatStudents;
