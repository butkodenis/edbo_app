const getUniversities = require('../loadData/getUniversities');
const saveUniversities = require('../import/saveUniversities');

const importUniversities = async () => {
  try {
    const data = await getUniversities(2022, 2, 40, 226);

    if (data.length > 0) {
      await saveUniversities(data);
    } else {
      console.log(`ІМПОРТ ПРОПОЗИЦІЙ: не коректні параметри!`);
      throw new Error(`неправильные параметры запроса`);
    }
  } catch (err) {
    console.error(
      'ПОМИЛКА операции ІМПОРТ ПРОПОЗИЦІЙ: (importUniversities)',
      error,
    );
  }
};
importUniversities();
