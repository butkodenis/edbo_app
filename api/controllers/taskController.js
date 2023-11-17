/* eslint-disable no-console */
const Tasks = require('../models/taskModel');
const importData = require('../import/importData');

const createTask = async (req, res) => {
  try {
    const data = req.body;

    const task = new Tasks({
      year: data.year,
      speciality: data.speciality,
      specialityText: data.specialityText,
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
    const dataTask = await Tasks.findById(id); // получаем { year, speciality...}
    // console.log(dataTask);

    switch (dataTask.task) {
      case 'saveIds':
        importData.importUniversities(dataTask);
        break;
      case 'saveStat':
        importData.importStatUniv(dataTask);
        break;
      case 'saveStud':
        importData.importStatStudent();
        break;
      default:
        throw new Error('Неверная операция');
        break;
    }
    res.status(200).json({ message: 'Running task', dataTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Произошла ошибка выполнеии задачи' });
  }
};

module.exports = { createTask, getTasksAll, deleteTask, runTask };
