/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const getUniversities = require('./loadData/getUniversities');
const saveUniversities = require('./loadData/saveUniversities');
const getStatUniv = require('./loadData/getStatUniv');
const saveStatUniv = require('./loadData/saveStatUniv');
const importUniversities = async (dataTask) => {
  try {
    const dataUniv = await getUniversities(dataTask);

    if (dataUniv.length > 0) {
      console.log(dataUniv.length, 'пропозиций');
      // генерируем случайный id для текущего импорта каждый раз
      const idJob = Math.floor(Math.random() * 10000);

      // передем в ф-ю пар-ры из формы
      await saveUniversities(dataUniv, idJob, dataTask._id);
    } else {
      console.log(`ІМПОРТ ПРОПОЗИЦІЙ: не коректні параметри!`);
      throw new Error(`Неправильные параметры запроса`);
    }
  } catch (err) {
    console.error('ПОМИЛКА операции ІМПОРТ ПРОПОЗИЦІЙ: (importUniversities)', err);
  }
};

const importStatUniv = async (dataTask) => {
  try {
    const { year, qualification, educationBase, speciality, _id } = dataTask;
    const dataUniv = await getUniversities(dataTask);

    const results = [];
    for (const item of dataUniv) {
      const { ids, uid } = item;
      const result = await getStatUniv(ids, uid, year, qualification, educationBase, speciality);
      for (const item of result) {
        results.push(item);
      }
    }

    console.log(results.length);

    saveStatUniv(results, dataTask);
  } catch (err) {
    console.error(err);
  }
};

const importStatStudent = async () => {
  try {
    console.log('student stat');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { importUniversities, importStatUniv, importStatStudent };
