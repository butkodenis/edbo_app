const Log = require('../models/logModel');
const Universities = require('../models/universitiesModel');
const StatUniv = require('../models/statUnivModel');
const StatStudent = require('../models/statStudModel');

const delLog = async (req, res) => {
  const { id } = req.params;
  try {
    const dataLog = await Log.findByPk(id);
    const { idJob } = dataLog;

    // удалить из таблиц
    await Universities.destroy({ where: { idJob } });
    await StatUniv.destroy({ where: { idJob } });
    await StatStudent.destroy({ where: { idJob } });

    // удалить из таблицы логов
    await Log.destroy({ where: { idJob } });
    console.log(dataLog);
    res.json({ message: 'Задача успешно удалена', idJob });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { delLog };
