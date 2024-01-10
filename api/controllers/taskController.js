/* eslint-disable no-console */
const Tasks = require('../models/taskModel');
const Log = require('../models/logModel');
const Schedule = require('../models/scheduleModel');
const importData = require('../import/importData');
const { Task } = require('../models/pgModel');

const createTask = async (req, res) => {
  try {
    const data = req.body;

    await Task.create({
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

    res.json({ message: 'Данные успешно обработаны' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ошибка на сервере' });
  }
};

const getTasksAll = async (req, res) => {
  try {
    const tasks = await Tasks.findAll();
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ошибка на сервере' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    // запрос в таблицу
    const deletedTask = await Tasks.destroy({
      where: { id: id },
    });

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
    const data = await Tasks.findByPk(id); // получаем { year, speciality...}
    const dataTask = data.dataValues;
    // console.log(dataTask);

    switch (dataTask.task) {
      case 'saveIds':
        await importData.importUniversities(dataTask);
        res.status(200).json({ message: 'Імпорт пропозицій виконан' });
        break;
      case 'saveStat':
        await importData.importStatUniv(dataTask);
        res.status(200).json({ message: 'Імпорт статистики пропозицій виконан' });
        break;
      case 'saveStud':
        await importData.importStatStudent(dataTask);
        res.status(200).json({ message: 'Імпорт статистики студентів виконан' });
        break;
      case 'saveAll':
        await importData.importAll(dataTask);
        res.status(200).json({ message: 'Імпорт усіх завдань виконан' });
        break;
      default:
        throw new Error('Помилковi параметри');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Ошибка выполнения задачи',
      error: err.message,
    });
  }
};

const getLog = async (req, res) => {
  try {
    const { id } = req.params;

    const dataLog = await Log.find({ idTask: id });

    res.status(200).json(dataLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createTask,
  getTasksAll,
  deleteTask,
  runTask,
  getLog,
};
