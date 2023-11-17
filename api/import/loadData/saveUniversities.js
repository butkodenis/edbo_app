/* eslint-disable no-console */
const Universities = require('../../models/universitiesModel');

const saveUniversities = async (data, idJob) => {
  try {
    // Сохраните данные в базе данных
    const universitiesData = data.map((item) => ({
      uid: item.uid,
      un: item.un,
      ids: item.ids,
      n: item.n,
      timeCreation: new Date(),
      idJob,
    }));
    await Universities.insertMany(universitiesData);
    console.log('Данные успешно сохранены в базе данных:');
  } catch (error) {
    const message = `помилка при збереженні даних: ${error.message}`;
    console.error(message);
  }
};

module.exports = saveUniversities;
