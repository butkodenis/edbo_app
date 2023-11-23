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
      timeCompleted: '',
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
      return res.status(404).json({ message: 'Документ с указанным ID не найден' });
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
        await importData.importUniversities(dataTask);
        res.status(200).json({ message: 'Задача 1 выполнена успешно' });
        break;
      case 'saveStat':
        await importData.importStatUniv(dataTask);
        res.status(200).json({ message: 'Задача 2 выполнена успешно' });
        break;
      case 'saveStud':
        await importData.importStatStudent();
        res.status(200).json({ message: 'Задача 3 выполнена успешно' });
        break;
      default:
        throw new Error('Неверная операция');
        break;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Ошибка выполнения задачи',
      error: err.message,
    });
  }
};

module.exports = { createTask, getTasksAll, deleteTask, runTask };
