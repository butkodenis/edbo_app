/* eslint-disable no-console */
const Universities = require('../../models/universitiesModel');
const Tasks = require('../../models/taskModel');
const saveLog = require('../loadData/saveLog');

const saveUniversities = async (data, idJob, dataTask) => {
  try {
    // Сохр. данные в БД
    const universitiesData = data.map((item) => ({
      uid: item.uid,
      un: item.un,
      ids: item.ids,
      n: item.n,
      timeCreation: new Date(),
      idJob,
    }));
    const idTask = dataTask._id;

    await Universities.insertMany(universitiesData);

    // получ время последней записи импорта
    const latestDate = await Universities.findOne({ idJob }).sort({
      timeCreation: -1,
    });

    // обновляем время импорта задачи в БД
    await Tasks.updateOne(
      { _id: idTask },
      { $set: { timeCompleted: latestDate.timeCreation, status: 'Виконано' } },
    );

    await saveLog();
    console.log(`Данные сохранены в базе данных:  ${latestDate.timeCreation} ${idTask}`);
  } catch (error) {
    const message = `помилка при збереженні даних: ${error.message}`;
    console.error(message);
    throw new Error('Невдале збереження університетів(saveUniversities)');
  }
};

module.exports = saveUniversities;
