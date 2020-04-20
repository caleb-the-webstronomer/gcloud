require("dotenv").config();
import { MongoClient } from "mongodb";

const connectMongoDB = () => MongoClient.connect(process.env.MONGODB);

const getContacts = (req, res) => {
  return connectMongoDB()
    .then((db) =>
      db
        .collection("todo")
        .find({})
        .toArray()
        .then((documents) => ({ db, documents })),
    )
    .then(({ db, documents }) => {
      db.close();
      return documents;
    })
    .then((contacts) => res.json(contacts))
    .catch((err) => res.status(400).send(err.toString()));
};

export const handler = getContacts;
