const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
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
    const data = req.body;
    console.log(data);
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
