/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const getUniversities = require('./loadData/getUniversities');
const saveUniversities = require('./loadData/saveUniversities');
const getStatUniv = require('./loadData/getStatUniv');
const saveStatUniv = require('./loadData/saveStatUniv');
const getStatStudents = require('./loadData/getStatStudents');
const saveStatStudents = require('./loadData/saveStatStudents');
const generateIdJob = require('./utility');
const updateTask = require('./loadData/updateTask');

/* импорт предложений университетов */
const importUniversities = async (dataTask) => {
  try {
    const dataUniv = await getUniversities(dataTask);

    if (dataUniv.length > 0) {
      // генерируем случайный id для текущего импорта каждый раз
      const idJob = generateIdJob();

      // передем в ф-ю пар-ры из формы
      await saveUniversities(dataUniv, idJob, dataTask);
    } else {
      throw new Error('Невірні параметри запиту');
    }
  } catch (err) {
    const status = 'Помилка';
    await updateTask(dataTask, status);

    if (err.message === 'Невірні параметри запиту') {
      throw err;
    } else {
      throw new Error(`Помилка імпорту пропозицій (importUniversities)`);
    }
  }
};

/* импорт статистики предложений университатов */
const importStatUniv = async (dataTask) => {
  try {
    const { year, qualification, educationBase, speciality } = dataTask;
    const dataUniv = await getUniversities(dataTask); // запрос предложений

    if (dataUniv.length === 0) {
      throw new Error('Невірні параметри запиту');
    }

    const results = [];
    for (const item of dataUniv) {
      const { ids, uid } = item;
      // получаем статистику по университету по всем предложения
      const result = await getStatUniv(ids, uid, year, qualification, educationBase, speciality);
      for (const itemResuit of result) {
        results.push(itemResuit);
      }
    }

    // генерируем случайный id для текущего импорта
    const idJob = await generateIdJob();
    //  сохраняем
    await saveStatUniv(results, idJob, dataTask);
  } catch (err) {
    // console.error(err);
    const status = 'Помилка';
    await updateTask(dataTask, status);

    if (err.message === 'Невірні параметри запиту') {
      throw err;
    } else {
      throw new Error(`Помилка імпорту статистики пропозицій (importStatUniv) `);
    }
  }
};

/* импорт статистики по студентам */
const importStatStudent = async (dataTask) => {
  try {
    const { year } = dataTask;
    const results = [];

    const dataUniv = await getUniversities(dataTask); // запрос предложений

    if (dataUniv.length === 0) {
      throw new Error('Невірні параметри запиту');
    }

    for (const item of dataUniv) {
      const { ids } = item;
      const idArray = ids.split(',').map(Number); // преобразуем в массив

      for (const id of idArray) {
        let step = 0;
        let last = year === 2022 ? 250 : 200; // Изменение значения last в зависимости от year

        let result = await getStatStudents(year, id, step); // запрос стат. студ. по номеру специальности

        while (result.length === last) {
          results.push(...result);
          step += last;
          result = await getStatStudents(year, id, step);
        }

        results.push(...result);
      }
    }

    console.log('студентов : ', results.length);

    // генерируем случайный id для текущего импорта
    const idJob = await generateIdJob();

    await saveStatStudents(results, idJob, dataTask);
  } catch (err) {
    console.error(err);
    const status = 'Помилка';
    await updateTask(dataTask, status);

    if (err.message === 'Невірні параметри запиту') {
      throw err;
    } else {
      throw new Error(`Помилка імпорту статистики студентів (importStatStudent)`);
    }
  }
};

/* Запуск всіх завдянь */
const importAll = async (dataTask) => {
  try {
    await importUniversities(dataTask);
    await importStatUniv(dataTask);
    await importStatStudent(dataTask);
  } catch (err) {
    // console.error(err);
    const status = 'Помилка';
    await updateTask(dataTask, status);

    if (err.message === 'Невірні параметри запиту') {
      throw err;
    } else {
      throw new Error(`Помилка операций всі завдання`);
    }
  }
};

module.exports = { importUniversities, importStatUniv, importStatStudent, importAll };
