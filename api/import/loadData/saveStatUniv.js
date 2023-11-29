const Tasks = require('../../models/taskModel');
const StatUniv = require('../../models/statUnivModel');
const generateIdJob = require('../utility');

const saveStatUniv = async (data, dataTask) => {
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

    const result = await StatUniv.insertMany(modData);

    console.log(`Данные успешно сохранены: ${result.length}`);

    // получ время последней записи импорта
    const latestDate = await StatUniv.findOne({ idJob }).sort({
      timeCreation: -1,
    });

    // обновляем время импорта задачи в БД
    await Tasks.updateOne(
      { _id },
      { $set: { timeCompleted: latestDate.timeCreation, status: 'Виконано' } },
    );
  } catch (error) {
    console.error('Ошибка при сохранении данных', error);
  }
};

module.exports = saveStatUniv;
