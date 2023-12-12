const mongoose = require('mongoose');

const connectToDatabase = (url) => {
  mongoose.connect(url);
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  return db;
};

module.exports = connectToDatabase;
