const mongoose = require('mongoose');

const statUnivShema = new mongoose.Schema({
  usid: Number,
  usn: String,
  ustn: String,
  uid: Number,
  un: String,
  ufn: String,
  rk: String,
  qid: String,
  qn: String,
  ebid: Number,
  ebn: String,
  efid: Number,
  efn: String,
  cid: Number,
  ssc: String,
  ssn: String,
  etrm: String,
  rtrm: String,
  price: String,
  xprice: String,
  up: Number,
  spn: String,
  ox: Number,
  ol: Number,
  oc: Number,
  rr: Number,
});

const StatUniv = mongoose.model('StatUniv', statUnivShema);

module.exports = StatUniv;
