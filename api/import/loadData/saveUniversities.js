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
    // throw new Error('тестовая ошибка');
    await Universities.insertMany(universitiesData);

    // обновляем время импорта задачи в БД
    await Tasks.updateOne(
      { _id: idTask },
      { $set: { timeCompleted: new Date(), status: 'Виконано' } },
    );

    const message = `імпортовано : ${data.length} універсітета`;
    await saveLog(dataTask, idJob, message);
    console.log(message);
  } catch (error) {
    const message = `Невдале збереження університетів(saveUniversities): ${error.message}`;
    console.error(message);
    const status = 'Помилка';
    saveLog(dataTask, idJob, message, status);
    throw new Error('Невдале збереження університетів(saveUniversities)');
  }
};

module.exports = saveUniversities;
