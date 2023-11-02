const mongoose = require('mongoose');

const taskShema = new mongoose.Schema({
  year: Number,
  specialty: Number,
  specialtyText: String,
  qualification: Number,
  qualificationText: String,
  educationBase: Number,
  educationBaseText: String,
  task: String,
});

const Task = mongoose.model('Task', taskShema);

module.exports = Task;
