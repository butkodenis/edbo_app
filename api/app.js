/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const connectToDatabase = require('./db');
const app = express();

const taskController = require('./controllers/taskController');
const logController = require('./controllers/logController');
const scheduleController = require('./controllers/scheduleController');
const scheduleAutorun = require('./import/scheduler');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const url = process.env.MONGODB_URI;
connectToDatabase(url);

app.get('/task/all', taskController.getTasksAll);
app.post('/task/create', taskController.createTask);
app.delete('/task/delete', taskController.deleteTask);

app.post('/task/:id/run', taskController.runTask);

app.get('/task/:id/log', taskController.getLog);
app.delete('/log/:id', logController.delLog);

app.get('/task/:id/shedule', scheduleController.getSchedule);
app.post('/task/:id/shedule', scheduleController.createSchedule);
app.put('/task/:id/shedule/:idSchedule', scheduleController.updateSchedule);
app.delete('/task/:id/shedule/:idSchedule', scheduleController.deleteSchedule);

const port = process.env.NODE_PORT;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
  scheduleAutorun();
});
