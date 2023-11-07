const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://butko:8Hd4mTmlceS9d9ft@cluster0.i7ddjab.mongodb.net'; // URL подключения к вашей базе данных
const dbName = 'sample_guides'; // Название вашей базы данных
const collectionName = 'planets'; // Название вашей коллекции
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const first = await collection.find().toArray();
    console.log(first);
    await client.close();
  } catch (err) {
    console.log(err);
  }
}

run();
