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
  taskText: String,
  status: String,
  timeCreation: Date,
  timeCompleted: Date,
});

const Tasks = mongoose.model('Tasks', taskShema);

module.exports = Tasks;
