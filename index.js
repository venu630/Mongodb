const express = require('express');
const { connectToDb , getDb} = require('./db');

const app = express();
const port = 3000;

//db connection
let db

connectToDb((err) => {
    if(!err){
        app.listen(port, () => {
            console.log('listening on port ' + port);
        });
        db = getDb();
    }

})


//routes 
app.get('/books', (req, res) => {

    let books = [];
    db.collection('books')
    .find()
    .forEach(book => books.push(book))
    .then(() => {
        res.send(books);
    })
    .catch(err => {
        console.log(err);
    })
})

app.get("/books/:name", (req, res) => {

    db.collection("books")
    .findOne({name: req.params.name})
    .then((doc) => {
        console.log(doc);
        res.send(doc);
    })
    .catch(err => {
        console.log(err);
    })
})