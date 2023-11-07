const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const url =
  'mongodb+srv://butko:8Hd4mTmlceS9d9ft@cluster0.i7ddjab.mongodb.net/sample_guides';
const collectionName = 'planets';

// Подключаемся к базе данных
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Определяем схему и модель для коллекции planets
const planetSchema = new mongoose.Schema({
  name: String,
});

const Planet = mongoose.model('Planet', planetSchema, collectionName);

// Реализуем GET запрос
app.get('/planets', async (req, res) => {
  try {
    const planets = await Planet.find();
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/task/all', async (req, res) => {
  try {
    const user = 'messaage';

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ошибка на сервере' });
    return;
  }
});

app.post('/task/all', async (req, res) => {
  try {
    const data = req.body.year;
    console.log(data);
    const planet = new Planet({ name: 'dddddd' });
    // сохраняем в бд
    await planet.save();
    res.json({ message: 'Данные успешно обработаны' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ошибка на сервере' });
    return;
  }
});

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
