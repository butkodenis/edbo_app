/* eslint-disable no-console */
const getUniversities = require('../loadData/getUniversities');
const saveUniversities = require('./saveUniversities');
const getStatUniv = require('../loadData/getStatUniv');

const importUniversities = async () => {
  try {
    const data = await getUniversities(2022, 2, 40, 226);

    if (data.length > 0) {
      const idJob = Math.floor(Math.random() * 10000);
      await saveUniversities(data, idJob);
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
//importUniversities();

const importStatUniv = async (id) => {
  try {
    await getStatUniv(id);
    console.log(id);
  } catch (err) {
    console.error(err);
  }
};
importStatUniv();

module.exports = { importUniversities, importStatUniv };
