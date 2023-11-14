/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const taskController = require('./controllers/taskController');

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

// Подключаемся к базе данных
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/task/all', taskController.getTasksAll);

app.post('/task/create', taskController.createTask);

app.delete('/task/delete', taskController.deleteTask);

app.post('/task/:id/run', taskController.runTask);

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
