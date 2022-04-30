const express = require('express');
const { connectToDb , getDb} = require('./db');

const app = express();
app.use(express.json());

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
        res.send(doc);
    })
    .catch(err => {
        console.log(err);
    })
})

app.post("/books", (req, res) => {
    
    let book = req.body;
    db.collection("books") 
    .insertOne(book)
    .then((result) => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
})


app.post("/books/:name", (req, res) => {

    db.collection("books")
    .deleteOne({name: req.params.name})
    .then((doc) => {
        res.send(doc);
    })
    .catch(err => {
        console.log(err);
    })
})


app.patch("/books/:name", (req, res) => {
    
    let updates = req.body;
    //updates data => {"age":69}

    db.collection("books") 
    .updateOne({name: req.params.name}, {$set : updates})
    .then((result) => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
})
