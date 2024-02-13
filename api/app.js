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
const dampController = require('./controllers/dampController');
const scheduleAutorun = require('./import/scheduler');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

connectToDatabase();

app.get('/api/task/all', taskController.getTasksAll);
app.post('/api/task/create', taskController.createTask);
app.delete('/api/task/delete', taskController.deleteTask);

app.post('/api/task/:id/run', taskController.runTask);

app.get('/api/task/:id/log', taskController.getLog);
app.delete('/api/log/:id', logController.delLog);

app.get('/api/task/:id/shedule', scheduleController.getSchedule);
app.post('/api/task/:id/shedule', scheduleController.createSchedule);
app.put('/api/task/:id/shedule/:idSchedule', scheduleController.updateSchedule);
app.delete('/api/task/:id/shedule/:idSchedule', scheduleController.deleteSchedule);

const port = process.env.NODE_PORT;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
  setTimeout(() => {
    scheduleAutorun();
  }, 15000);
});
