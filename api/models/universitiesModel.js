const mongoose = require('mongoose');

const universitiesSchema = new mongoose.Schema({
  uid: Number,
  un: String,
  ids: String,
  n: Number,
});

const Universities = mongoose.model('Universities', universitiesSchema);

module.exports = Universities;
