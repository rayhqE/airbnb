const mongo = require("mongodb");

const MongoCLient = mongo.MongoClient;

const url =
  "mongodb://root:Rust1234@ac-85mr5f1-shard-00-00.qikfhs5.mongodb.net:27017,ac-85mr5f1-shard-00-01.qikfhs5.mongodb.net:27017,ac-85mr5f1-shard-00-02.qikfhs5.mongodb.net:27017/?ssl=true&replicaSet=atlas-lnwgrs-shard-0&authSource=admin&appName=Cluster0";

let _db;

const mongoConnect = (callback) => {
  MongoCLient.connect(url)
    .then((client) => {
      _db = client.db("airbnb");
      callback();
    })
    .catch((err) => {
      console.log("Error while connecting mongoDB: ", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Mongo not Connected");
  }
  return _db;
};

module.exports = { getDB, mongoConnect };
