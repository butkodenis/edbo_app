const Log = require('../../models/logModel');

const saveLog = async () => {
  try {
    const log = new Log({
      timeCreation: new Date(),
      idJob: 123,
    });
    await log.save();
  } catch (error) {
    console.log(error);
    throw new Error('Невдале збереження log');
  }
};
module.exports = saveLog;
