const Tasks = require('../../models/taskModel');
const StatUniv = require('../../models/statUnivModel');

const saveStatUniv = async (data) => {
  try {
    // Используйте await для вставки данных в MongoDB и обработки результата
    await StatUniv.insertMany(data);
    console.log('Данные успешно сохранены');
  } catch (error) {
    console.error('Ошибка при сохранении данных', error);
  }
};

module.exports = saveStatUniv;
