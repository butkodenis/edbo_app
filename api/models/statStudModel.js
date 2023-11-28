const mongoose = require('mongoose');

const statStudShema = new mongoose.Schema({
  prid: Number,
  n: Number,
  prsid: Number,
  ptid: Number,
  fio: String,
  pa: Number,
  d: Number,
  artid: Number,
  kv: Number,
  p: Number,
  rss: { type: Array, default: [] },
  timeCreation: Date,
  idTask: String,
  idJob: Number,
});

const StatStudent = mongoose.model('StatStudent', statStudShema);

module.exports = StatStudent;
