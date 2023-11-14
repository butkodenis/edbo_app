const mongoose = require('mongoose');

// Подключение к базе данных
mongoose.connect(
  'mongodb+srv://butko:8Hd4mTmlceS9d9ft@cluster0.i7ddjab.mongodb.net/edbo',
);

const Universities = require('../models/universitiesModel');

const saveUniversities = async (data, idJob) => {
  try {
    // Сохраните данные в базе данных
    const universitiesData = data.map((item) => ({
      uid: item.uid,
      un: item.un,
      ids: item.ids,
      n: item.n,
      timeCreation: new Date(),
      idJob: idJob,
    }));
    const savedUniversities = await Universities.insertMany(universitiesData);
    console.log('Данные успешно сохранены в базе данных:');
  } catch (error) {
    const message = `помилка при збереженні даних: ${error.message}`;
    console.error(message);
  }
};

module.exports = saveUniversities;
