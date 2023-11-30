const Log = require('../../models/logModel');

const saveLog = async (dataTask, idJob, message, status) => {
  try {
    const log = new Log({
      idTask: dataTask._id,
      task: dataTask.task,
      taskText: dataTask.taskText,
      info: message,
      status, // статус передаем в ручную. dataTask содержит данные до запуска изменения
      timeCreation: new Date(),
      idJob,
    });
    await log.save();
  } catch (error) {
    console.log(error);
    throw new Error('Невдале збереження log');
  }
};
module.exports = saveLog;
