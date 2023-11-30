const StatStudent = require('../../models/statStudModel');
const Tasks = require('../../models/taskModel');
const saveLog = require('../loadData/saveLog');

const saveStatStudents = async (data, idJob, dataTask) => {
  try {
    const { _id } = dataTask;

    // добавляем время импорта и код выполяемой задачи
    const modData = data.map((item) => ({
      ...item,
      timeCreation: new Date(),
      idJob,
      idtask: _id,
    }));

    const result = await StatStudent.insertMany(modData);

    console.log(`імпортовано : ${result.length} студентів`);

    // получ время последней записи импорта
    const latestDate = await StatStudent.findOne({ idJob }).sort({
      timeCreation: -1,
    });

    // обновляем время импорта задачи в БД
    await Tasks.updateOne(
      { _id },
      { $set: { timeCompleted: latestDate.timeCreation, status: 'Виконано' } },
    );
    const message = `імпортовано : ${result.length} студентів`;
    await saveLog(dataTask, idJob, message);
  } catch (error) {
    const message = 'Невдале збереження  статистики по студентам(saveStatStudents)';
    await saveLog(dataTask, idJob, message);
    console.error(error);
    throw new Error('Невдале збереження  статистики по студентам(saveStatStudents)');
  }
};
module.exports = saveStatStudents;
