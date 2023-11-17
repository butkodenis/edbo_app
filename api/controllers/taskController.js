/* eslint-disable no-console */
const Tasks = require('../models/taskModel');
const importData = require('../import/importData');

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
      status: '',
      timeCreation: new Date(),
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

const runTask = async (req, res) => {
  try {
    const { id } = req.params;

    // запрос в таблицу, получить параметры задачи по id
    const result = await Tasks.findById(id);

    switch (result.task) {
      case 'saveIds':
        importData.importUniversities();
        break;
      case 'saveStat':
        importData.importStatUniv();
        break;
      case 'saveStud':
        break;
      default:
        throw new Error('Неверная операция');
        break;
    }
    res.status(200).json({ message: 'Running task', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Произошла ошибка выполнеии задачи' });
  }
};

module.exports = { createTask, getTasksAll, deleteTask, runTask };
