const {MongoClient} = require('mongodb');

let dbConnection

//cb callBack functin
const connectToDb = (cb) => {
    MongoClient.connect("mongodb://localhost:27017/bookstore")
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