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
    const { schedule_ } = req.body;
    console.log(id, schedule_);
    // Проверяем, чтобы schedule и id были переданы в запросе
    if (!schedule || !id) {
      return res.status(400).json({ error: 'Необходимо передать schedule и id в запросе' });
    }

    const newSchedule = new Schedule({
      schedule: schedule_,
      idTask: id,
    });

    await newSchedule.save();

    //const dataTask = await Tasks.findById(id);
    const job = schedule.scheduleJob(schedule_, () => {
      console.log(id);
    });
    jobList.push(job);

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

    res.json({ message: 'Расписание успешно удалено', deletedShedule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при удалении записи из базы данных' });
  }
};

module.exports = { postSchedule, getShedule, deleteShedule, jobList };
