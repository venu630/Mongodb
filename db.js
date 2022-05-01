const {MongoClient} = require('mongodb');
require('dotenv').config()

let dbConnection
const uri = process.env.URI;
//cb callBack functin
const connectToDb = (cb) => {

    //local connection
    // MongoClient.connect("mongodb://localhost:27017/bookstore")
    MongoClient.connect(uri)

    .then((client) => {
        dbConnection = client.db();
        return cb();
    })
    .catch((err) => {
        console.error(err);
        return cb(err);
    })
}

const getDb = () => dbConnection;

module.exports = {connectToDb, getDb}