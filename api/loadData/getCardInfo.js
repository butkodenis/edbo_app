const Tasks = require('../models/taskModel');

const getCardInfo = async (id) => {
  try {
    const result = await Tasks.findById(id);

    if (result) {
      console.log(result);
      return result;
    } else {
      console.log('Элемент не найден');
    }
  } catch (error) {
    console.error('Ошибка запроса к базе данных:', error);
  }
};

getCardInfo('655493d2d3a782f130b28a06');

module.exports = getCardInfo;
