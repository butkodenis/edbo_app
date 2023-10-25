const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://root:123456@localhost:27017"; // URL подключения к вашей базе данных
const dbName = "edbo"; // Название вашей базы данных
const collectionName = "user"; // Название вашей коллекции
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
