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
  osn: {
    type: Object,
    default: {},
  },
  os: {
    type: Object,
    default: {},
  },
  st: {
    c: {
      t: Number,
      a: Number,
      b: Number,
      ka: Number,
      km: Number,
      kx: Number,
      r: Number,
      ob: Number,
      oc: Number,
      rm: Number,
      obm: Number,
      ocm: Number,
    },
  },
  year: Number,
  timeCreation: Date,
  idTask: String,
  idJob: Number,
});

const StatUniv = mongoose.model('StatUniv', statUnivShema);

module.exports = StatUniv;
