const express = require("express");
const logger = require("morgan");
const { MongoClient } = require("mongodb");
const app = express();

app.get("/", async (req, res) => {
  try {
    const user = "messaage";

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Ошибка на сервере" });
    return;
  }
});

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
