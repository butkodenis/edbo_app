/* eslint-disable no-console */
const Universities = require('../../models/universitiesModel');
const saveLog = require('./saveLog');
const updateTask = require('./updateTask');

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

    await Universities.insertMany(universitiesData);

    /* обновл. статут, время задачи */
    const status = 'Виконано';
    await updateTask(dataTask, status);

    const message = `імпортовано : ${data.length} універсітета по ${dataTask.speciality}`;
    await saveLog(dataTask, idJob, message, status);
    console.log(message);
  } catch (error) {
    const status = 'Помилка';
    await updateTask(dataTask, status);

    const message = `Невдале збереження університетів (saveUniversities): ${error.message}`;
    saveLog(dataTask, idJob, message, status);

    throw new Error('Невдале збереження університетів (saveUniversities)');
  }
};

module.exports = saveUniversities;
