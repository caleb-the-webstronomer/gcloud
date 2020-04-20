require("dotenv").config();

const co = require("co");
const mongodb = require("mongodb");

const uri = process.env.MONGODB;

exports.todo = (req, res) => {
  co(function* () {
    const client = yield mongodb.MongoClient.connect(uri);

    const docs = yield client.db("Kaleb").collection("todo").find().toArray();
    res.send("Result: " + JSON.stringify(docs));
  }).catch((error) => {
    res.send("Error: " + error.toString());
  });
};
