const Log = require('../../models/logModel');

const saveLog = async (dataTask, idJob, message, status) => {
  try {
    await Log.create({
      idTask: dataTask.id,
      task: dataTask.task,
      taskText: dataTask.taskText,
      info: message,
      status, // статус передаем в ручную. dataTask содержит данные до запуска изменения
      timeCreation: new Date(),
      idJob,
    });
  } catch (error) {
    console.log(error);
    throw new Error('Невдале збереження log');
  }
};
module.exports = saveLog;
