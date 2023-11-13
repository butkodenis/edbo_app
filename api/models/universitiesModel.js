const mongoose = require('mongoose');

const universitiesShema = new mongoose.Schema({
  uid: Number,
  un: String,
  ids: String,
  n: Number,
});

const Universities = mongoose.model('Universities', universitiesShema);

module.exports = Universities;
