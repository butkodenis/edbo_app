const Log = require('../models/logModel');
const Universities = require('../models/universitiesModel');
const StatUniv = require('../models/statUnivModel');
const StatStudent = require('../models/statStudModel');

const delLog = async (req, res) => {
  const { id } = req.params;
  try {
    const dataLog = await Log.findById(id);
    const { idJob } = dataLog;

    // удалить из таблиц
    await Universities.deleteMany({ idJob });
    await StatUniv.deleteMany({ idJob });
    await StatStudent.deleteMany({ idJob });

    // удлалить из таблицы логов
    await Log.deleteOne({ idJob });
    console.log(dataLog);
    res.json({ message: 'Задача успешно удалена', idJob });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { delLog };
