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

const Tasks = require('../models/taskModel');

/* импорт предложений университетов */
const importUniversities = async (dataTask) => {
  try {
    const dataUniv = await getUniversities(dataTask);

    if (dataUniv.length > 0) {
      console.log(dataUniv.length, 'пропозиций');
      // генерируем случайный id для текущего импорта каждый раз
      const idJob = generateIdJob();

      // передем в ф-ю пар-ры из формы
      await saveUniversities(dataUniv, idJob, dataTask);
    } else {
      // console.log(`ІМПОРТ ПРОПОЗИЦІЙ: не коректні параметри!`);
      throw new Error(`Неправильные параметры запроса`);
    }
  } catch (error) {
    console.error('ПОМИЛКА операции ІМПОРТ ПРОПОЗИЦІЙ: (importUniversities)', error);
    const { _id } = dataTask;
    await Tasks.updateOne({ _id }, { $set: { timeCompleted: new Date(), status: 'Помилка' } });
    throw new Error(`ПОМИЛКА операции ІМПОРТ ПРОПОЗИЦІЙ: (importUniversities)`);
  }
};

/* импорт статистики предложений университатов */
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

    // генерируем случайный id для текущего импорта
    const idJob = await generateIdJob();
    //  сохраняем
    await saveStatUniv(results, idJob, dataTask);
  } catch (err) {
    console.error(' помилка импорт статистики предложений университатов (importStatUniv) ', err);
    const { _id } = dataTask;
    await Tasks.updateOne({ _id }, { $set: { timeCompleted: new Date(), status: 'Помилка' } });
    throw new Error(`помилка импорт статистики предложений университатов (importStatUniv)`);
  }
};

/* импорт статистики по студентам */
const importStatStudent = async (dataTask) => {
  try {
    const { year } = dataTask;
    const results = [];

    const dataUniv = await getUniversities(dataTask); // запрос предложений

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
  } catch (error) {
    console.error(error);
    const { _id } = dataTask;
    await Tasks.updateOne({ _id }, { $set: { timeCompleted: new Date(), status: 'Помилка' } });
    throw new Error(`помилка импорт статистики предложений университатов (importStatStudent)`);
  }
};

/* Запуск всіх завдянь */
const importAll = async (dataTask) => {
  try {
    await importUniversities(dataTask);
    await importStatUniv(dataTask);
    await importStatStudent(dataTask);
  } catch (error) {
    console.error(error);
    const { _id } = dataTask;
    await Tasks.updateOne({ _id }, { $set: { timeCompleted: new Date(), status: 'Помилка' } });

    throw new Error(`Ошибка операций всі завдання`);
  }
};

module.exports = { importUniversities, importStatUniv, importStatStudent, importAll };
