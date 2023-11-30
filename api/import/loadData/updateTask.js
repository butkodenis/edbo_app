const Tasks = require('../../models/taskModel');

const updateTask = async (dataTask, status) => {
  try {
    const { _id } = dataTask;
    // обновляем время импорта задачи в БД
    await Tasks.updateOne({ _id }, { $set: { timeCompleted: new Date(), status } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateTask;
