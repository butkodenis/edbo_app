const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Job = model('Job', jobSchema);

module.exports = Job;
