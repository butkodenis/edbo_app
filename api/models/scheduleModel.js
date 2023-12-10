const mongoose = require('mongoose');

const scheduleShema = new mongoose.Schema({
  schedule: String,
  idTask: String,
});

const Schedule = mongoose.model('Schedule', scheduleShema);

module.exports = Schedule;
