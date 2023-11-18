/* eslint-disable no-console */
const getUniversities = require('./loadData/getUniversities');
const saveUniversities = require('./loadData/saveUniversities');
const getStatUniv = require('./loadData/getStatUniv');

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
      throw new Error(`неправильные параметры запроса`);
    }
  } catch (err) {
    console.error(
      'ПОМИЛКА операции ІМПОРТ ПРОПОЗИЦІЙ: (importUniversities)',
      err,
    );
  }
};

const importStatUniv = async (dataTask) => {
  try {
    const dataUniv = await getUniversities(dataTask);
    const idJob = Math.floor(Math.random() * 10000);

    const dataStatUniv = await getStatUniv(
      '991183, 998028, 1012749, 110769',
      85,
      2022,
      2,
      40,
      226,
    );
    console.log(dataStatUniv[0], dataStatUniv[0]);
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
