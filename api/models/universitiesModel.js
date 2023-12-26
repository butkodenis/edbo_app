const mongoose = require('mongoose');

const universitiesSchema = new mongoose.Schema({
  uid: Number,
  un: String,
  ids: String,
  n: Number,
  timeCreation: Date,
  idTask: String,
  idJob: Number,
  year: Number,
});

const Universities = mongoose.model('Universities', universitiesSchema);

module.exports = Universities;
