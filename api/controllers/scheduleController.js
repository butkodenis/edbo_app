const schedule = require('node-schedule');

const Schedule = require('../models/scheduleModel');
const Tasks = require('../models/taskModel');
const importDataScheduler = require('../import/importDataScheduler');

let jobList = []; // обьявленм глобалную переменую для

const getSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const dataSchedule = await Schedule.findAll({
      where: {
        idTask: id,
      },
    });

    console.log(new Date());
    res.status(200).json(dataSchedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при запросе даных ' });
  }
};

const createSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { timing } = req.body;

    // Проверяем, чтобы schedule и id были переданы в запросе
    if (!timing || !id) {
      return res.status(400).json({ error: 'Необходимо передать schedule и id в запросе' });
    }
    // сораняем в БД
    const newSchedule = await Schedule.create({
      timing,
      idTask: id,
    });

    const { _id } = newSchedule;

    const nameJob = _id.toString(); // _id будем использовать как уникальное имя для списка задач

    const newJob = schedule.scheduleJob(nameJob, timing, async () => {
      const dataTask = await Tasks.findByPk(id);
      // console.log(id, '___', dataTask.taskText, new Date());
      importDataScheduler(dataTask);
    });
    jobList.push(newJob);

    // Отправляем успешный ответ
    res.status(201).json({ message: 'Запись успешно сохранена в базе данных' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при сохранении записи в базе данных' });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { idSchedule } = req.params;
    const { timing } = req.body;

    console.log(idSchedule, timing);

    if (!idSchedule || !timing) {
      return res.status(400).json({ error: 'Отсутствуют необходимые параметры в запросе' });
    }

    await Schedule.update(
      { timing },
      {
        where: {
          _id: idSchedule,
        },
      },
    );

    jobList.filter((job) => {
      if (job.name === idSchedule) {
        job.reschedule(timing);
      }
    });

    res.json({ message: 'Расписание успешно изменено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при сохранении записи в базе данных' });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { idSchedule } = req.params;
    const deletedSchedule = await Schedule.destroy({
      where: {
        _id: idSchedule,
      },
    });

    if (!deletedSchedule) {
      // Если deletedShedule пустой, отправляем соответствующий ответ
      return res.status(404).json({ error: 'Расписание с указанным ID не найдено' });
    }
    // удаляем текещее задание из планировщика
    jobList.filter((job) => {
      if (job.name === idSchedule) {
        job.cancel();
      }
    });

    res.json({ message: 'Расписание успешно удалено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при удалении записи из базы данных' });
  }
};

module.exports = { createSchedule, getSchedule, updateSchedule, deleteSchedule, jobList };
