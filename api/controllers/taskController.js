/* eslint-disable no-console */
const Tasks = require('../models/taskModel');
const Log = require('../models/logModel');
const Schedule = require('../models/scheduleModel');
const importData = require('../import/importData');
const scheduleTasks = require('../import/scheduler');

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

const getShedule = async (req, res) => {
  try {
    const { id } = req.params;
    const dataShedule = await Schedule.find({ idTask: id });
    res.status(200).json(dataShedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при запросе даных ' });
  }
};

const postSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { schedule } = req.body;

    // Проверяем, чтобы schedule и id были переданы в запросе
    if (!schedule || !id) {
      return res.status(400).json({ error: 'Необходимо передать schedule и id в запросе' });
    }

    const newSchedule = new Schedule({
      schedule,
      idTask: id,
    });

    await newSchedule.save();

    await scheduleTasks();
    // Отправляем успешный ответ
    res.status(201).json({ message: 'Запись успешно сохранена в базе данных' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при сохранении записи в базе данных' });
  }
};

const deleteShedule = async (req, res) => {
  try {
    const { idShedule } = req.params;
    const deletedShedule = await Schedule.findOneAndDelete({ _id: idShedule });

    if (!deletedShedule) {
      // Если deletedShedule пустой, отправляем соответствующий ответ
      return res.status(404).json({ error: 'Расписание с указанным ID не найдено' });
    }
    await scheduleTasks();

    res.json({ message: 'Расписание успешно удалено', deletedShedule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при удалении записи из базы данных' });
  }
};

module.exports = {
  createTask,
  getTasksAll,
  deleteTask,
  runTask,
  getLog,
  postSchedule,
  getShedule,
  deleteShedule,
};
