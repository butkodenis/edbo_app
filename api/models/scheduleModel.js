const mongoose = require('mongoose');

const scheduleShema = new mongoose.Schema({
  timing: String,
  idTask: String,
});

const Schedule = mongoose.model('Schedule', scheduleShema);

module.exports = Schedule;
