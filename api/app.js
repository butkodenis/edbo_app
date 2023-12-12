/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const connectToDatabase = require('./db');
const app = express();

const scheduleTasks = require('./import/scheduler');

const taskController = require('./controllers/taskController');
const logController = require('./controllers/logController');
const scheduleController = require('./controllers/scheduleController');

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

app.post('/task/:id/shedule', scheduleController.postSchedule);

app.get('/task/:id/shedule', scheduleController.getShedule);

app.delete('/task/:id/shedule/:idShedule', scheduleController.deleteShedule);

//scheduleTasks();

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
