/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const getUniversities = require('./loadData/getUniversities');
const saveUniversities = require('./loadData/saveUniversities');
const getStatUniv = require('./loadData/getStatUniv');
const saveStatUniv = require('./loadData/saveStatUniv');
const getStatStudents = require('./loadData/getStatStudents');

// импорт предложений университетов
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
      //console.log(`ІМПОРТ ПРОПОЗИЦІЙ: не коректні параметри!`);
      throw new Error(`Неправильные параметры запроса`);
    }
  } catch (err) {
    console.error('ПОМИЛКА операции ІМПОРТ ПРОПОЗИЦІЙ: (importUniversities)', err);
    throw new Error(`ПОМИЛКА операции ІМПОРТ ПРОПОЗИЦІЙ: (importUniversities)`);
  }
};

// импорт статистики предложений университатов
const importStatUniv = async (dataTask) => {
  try {
    const { year, qualification, educationBase, speciality, _id } = dataTask;
    const dataUniv = await getUniversities(dataTask); // запрос предложений

    const results = [];
    for (const item of dataUniv) {
      const { ids, uid } = item;
      // получаем статистику по университету по всем предложения
      const result = await getStatUniv(ids, uid, year, qualification, educationBase, speciality);
      for (const itemResuit of result) {
        results.push(itemResuit);
      }
    }

    console.log(results.length);
    //  сохраняем массив
    await saveStatUniv(results, dataTask);
  } catch (err) {
    console.error(' помилка импорт статистики предложений университатов (importStatUniv) ', err);
    throw new Error(`помилка импорт статистики предложений университатов (importStatUniv)`);
  }
};

// импорт статистики по студентам
const importStatStudent = async (dataTask) => {
  try {
    const { year } = dataTask;
    const results = [];

    const dataUniv = await getUniversities(dataTask); // запрос предложений

    for (const item of dataUniv) {
      const { ids } = item;
      const idArray = ids.split(',').map(Number);

      for (const id of idArray) {
        console.log(id);
        let step = 0;
        let last = year === 2022 ? 250 : 200; // Изменение значения last в зависимости от year

        let result = await getStatStudents(year, id, step); // запрос студ. по номеру специальности

        while (result.length === last) {
          results.push(...result);
          step += last;
          result = await getStatStudents(year, id, step);
        }

        results.push(...result);
      }
    }

    console.log('студентов : ', results.length);
    console.log(results[0]);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { importUniversities, importStatUniv, importStatStudent };
