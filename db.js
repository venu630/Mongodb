const {MongoClient} = require('mongodb');

let dbConnection
const uri = "mongodb+srv://venu:nm78th2019@cluster0.mzcnu.mongodb.net/bookstore?retryWrites=true&w=majority"
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