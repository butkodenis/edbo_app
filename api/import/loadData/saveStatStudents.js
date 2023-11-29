const StatStudent = require('../../models/statStudModel');
const Tasks = require('../../models/taskModel');
const generateIdJob = require('../utility');

const saveStatStudents = async (data, dataTask) => {
  try {
    const { _id } = dataTask;
    const idJob = await generateIdJob();

    // добавляем время импорта и код выполяемой задачи
    const modData = data.map((item) => ({
      ...item,
      timeCreation: new Date(),
      idJob,
      idtask: _id,
    }));

    const result = await StatStudent.insertMany(modData);

    console.log(`Данные успешно сохранены: ${result.length} студентов`);

    // получ время последней записи импорта
    const latestDate = await StatStudent.findOne({ idJob }).sort({
      timeCreation: -1,
    });

    // обновляем время импорта задачи в БД
    await Tasks.updateOne(
      { _id },
      { $set: { timeCompleted: latestDate.timeCreation, status: 'Виконано' } },
    );
  } catch (error) {
    console.error(error);

    throw new Error('Невдале збереження  статистики по студентам(saveStatStudents)');
  }
};
module.exports = saveStatStudents;
