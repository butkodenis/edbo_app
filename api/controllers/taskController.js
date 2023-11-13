/* eslint-disable no-console */
const Tasks = require('../models/taskModel');

const createTask = async (req, res) => {
  try {
    const data = req.body;

    const task = new Tasks({
      year: data.year,
      specialty: data.specialty,
      specialtyText: data.specialtyText,
      qualification: data.qualification,
      qualificationText: data.qualificationText,
      educationBase: data.educationBase,
      educationBaseText: data.educationBaseText,
      task: data.task,
      taskText: data.taskText,
    });

    await task.save();
    res.json({ message: 'Данные успешно обработаны' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ошибка на сервере' });
  }
};

const getTasksAll = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ошибка на сервере' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedTask = await Tasks.findOneAndDelete({ _id: id });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: 'Документ с указанным ID не найден' });
    }
    res.json({ message: 'Задача успешно удалена', deletedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Произошла ошибка при удалении задачи' });
  }
};

module.exports = { createTask, getTasksAll, deleteTask };
