const schedule = require('node-schedule');

const Schedule = require('../models/scheduleModel');
const Tasks = require('../models/taskModel');

let jobList = [];

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
    const { timing } = req.body;
    console.log(id, timing);
    // Проверяем, чтобы schedule и id были переданы в запросе
    if (!schedule || !id) {
      return res.status(400).json({ error: 'Необходимо передать schedule и id в запросе' });
    }
    // сораняем в БД
    const newSchedule = new Schedule({
      timing,
      idTask: id,
    });

    const { _id } = await newSchedule.save();
    console.log(_id.toString());
    const nameJob = _id.toString();

    const newJob = schedule.scheduleJob(nameJob, timing, async () => {
      const dataTask = await Tasks.findById(id);
      console.log(id, dataTask.taskText, new Date());
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
    const { idShedule } = req.params;
    const { timing } = req.body;
    // console.log(idShedule, timing);

    if (!idShedule || !timing) {
      return res.status(400).json({ error: 'Отсутствуют необходимые параметры в запросе' });
    }

    await Schedule.findOneAndUpdate({ _id: idShedule }, { $set: { timing } });

    jobList.filter((job) => {
      if (job.name === idShedule) {
        job.reschedule(timing);
      }
    });

    res.json({ message: 'Расписание успешно изменено' });
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
    // удаляем текещее задание из планировщика
    jobList.filter((job) => {
      if (job.name === idShedule) {
        job.cancel();
      }
    });

    res.json({ message: 'Расписание успешно удалено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при удалении записи из базы данных' });
  }
};

module.exports = { postSchedule, getShedule, updateSchedule, deleteShedule, jobList };
