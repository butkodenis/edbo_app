/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const Tasks = require('./models/taskModel');

app.use(morgan('tiny'));

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const url =
  'mongodb+srv://butko:8Hd4mTmlceS9d9ft@cluster0.i7ddjab.mongodb.net/edbo';
const collectionName = 'tasks';

// Подключаемся к базе данных
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/task/all', async (req, res) => {
  try {
    const user = 'messaage';
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ошибка на сервере' });
    return;
  }
});

app.post('/task/all', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const task = new Tasks({
      year: data.year,
      specialty: data.specialty,
      specialtyText: data.specialtyText,
      qualification: data.qualification,
      qualificationText: data.qualificationText,
      educationBase: data.educationBase,
      educationBaseText: data.educationBaseText,
      task: data.task,
    });
    // сохраняем в бд
    await task.save();
    res.json({ message: 'Данные успешно обработаны' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ошибка на сервере' });
    return;
  }
});

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
