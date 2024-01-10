const Tasks = require('../../models/taskModel');

const updateTask = async (dataTask, status) => {
  try {
    const { id } = dataTask;
    // обновляем время импорта задачи в БД
    const updateData = {
      timeCompleted: new Date(),
      status,
    };
    await Tasks.update(updateData, {
      where: { id: id },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateTask;
