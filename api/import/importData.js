/* eslint-disable no-console */
const getUniversities = require('./loadData/getUniversities');
const saveUniversities = require('./loadData/saveUniversities');
const getStatUniv = require('./loadData/getStatUniv');

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

const importStatUniv = async () => {
  try {
    const data = await getUniversities(2022, 2, 40, 226);
    const idJob = Math.floor(Math.random() * 10000);

    await getStatUniv('991183, 998028, 1012749, 110769', 85, 2022, 2, 40, 226);
    console.log('prop stat!');
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
