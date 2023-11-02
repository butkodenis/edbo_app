const Task = require('../models/taskModel');

const createTask = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    res.json({ message: 'Данные успешно сохранены' });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка на сервере' });
  }
};

module.exports = createTask;
