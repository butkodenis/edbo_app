const mongoose = require('mongoose');

const logShema = new mongoose.Schema({
  idTask: String,
  task: String,
  taskText: String,
  status: String,
  timeCreation: Date,
  idJob: Number,
});
const Log = mongoose.model('Log', logShema);

module.exports = Log;
